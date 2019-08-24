const { formError, generalError } = require("../../services/errorService");
const userService = require("../../services/userService");
const authenticationService = require("../../services/authenticationService");
const mailService = require("../../services/mailService");
const validateUser = require("../../validation/validateUser");

const keys = require("../../../config/keys");

const twoDays = 172800;

exports.test = async (req, res) => {
  return res.json({ status: "working" });
};

exports.getAuthenticatedUser = async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      let [token, authenticated] = [
        await authenticationService.generateToken(user, twoDays),
        true
      ];
      return res.json({ user, token, authenticated });
    }
    throw generalError("No user found.", 400, "get", false);
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};

exports.create = async (req, res) => {
  try {
    const { valid, errors } = validateUser(req.body);
    if (!valid) {
      throw formError(errors, "create", true);
    }
    const { email, name, password } = req.body;
    const existingUser = await userService.get({ email });

    if (existingUser) {
      throw formError("A user with this email already exists.", "create", true);
    }

    const salt = await authenticationService.salt();
    const hash = await authenticationService.hash(password, salt);
    const emailToken = await authenticationService.generateToken({
      email,
      name
    });

    const user = await userService.create({
      email,
      name,
      password: hash,
      created: Date.now(),
      updated: Date.now(),
      emailData: { token: emailToken, emailVerified: false }
    });

    const token = await authenticationService.generateToken(user._doc, twoDays);
    await mailService.sendEmail({
      to: user._doc.email,
      subject: "Confirm your email",
      topic: "Confirm email",
      text: keys.links.verifyEmail + emailToken,
      link: true
    });
    return res.json({ token, user: user._doc, authenticated: true });
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};

exports.delete = async (req, res) => {
  try {
    const { _id } = req.user;
    await userService.delete({ _id });
    return res.json({ status: "good", action: "delete" });
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.get({ email });
    if (!user) {
      throw formError(
        "These credentials did not match any existing users.",
        "create",
        true
      );
    }

    if (
      await authenticationService.comparePasswords(password, user._doc.password)
    ) {
      delete user._doc.password;
      let token = await authenticationService.generateToken(user._doc, twoDays);
      return res.json({ token, user, authenticated: true });
    } else {
      throw formError(
        "These credentials did not match any existing users.",
        "create",
        true
      );
    }
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};

exports.sendPasswordLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.get({ email });
    if (user) {
      const passwordToken = await authenticationService.generateToken(
        {
          name: user._doc.name,
          email: user._doc.email,
          date: Date.now()
        },
        twoDays
      );
      user.emailData.passwordToken = passwordToken;
      const updatedUser = await userService.update(user);

      await mailService.sendEmail({
        to: user._doc.email,
        subject: "Password reset link",
        topic: "Recover password",
        text:
          keys.links.resetPasswordLink + updatedUser.emailData.passwordToken,
        link: true
      });

      return res.json({ status: "good", action: "email" });
    } else {
      throw generalError("No user with this email found.", 400, "get", false);
    }
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirm } = req.body;
    const { errors } = validateUser({ password, confirm });
    if (errors.password) {
      throw formError(errors.password, "create", true);
    }
    const decoded = authenticationService.verifyToken(token);
    const user = await userService.get({
      name: decoded.name,
      email: decoded.email,
      "emailData.passwordToken": token
    });
    if (user) {
      let salt = await authenticationService.salt();
      let hash = await authenticationService.hash(password, salt);
      user.password = hash;
      user.emailData.passwordToken = "";
      await userService.update(user);
      return res.json({ status: "good", action: "updated" });
    } else {
      throw formError(
        "Something went wrong with the verificaton.",
        "update",
        true
      );
    }
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await userService.get({ "emailData.token": token });
    if (user) {
      user.emailData.verified = true;
      await userService.update(user);
      return res.json({ status: "good", action: "updated" });
    } else {
      throw formError(
        "Something went wrong with the verificaton.",
        "update",
        true
      );
    }
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};
