const User = require("../../database/models/User");
const keys = require("../../config/keys");

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const userCache = require("../services/cache/userCache");
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ msg: "Expired token" });
    }

    const cachedUser = await userCache.check(decoded._id);

    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      next();
    } else {
      let user = await User.findOne({ _id: decoded._id }).select("-password");

      if (user) {
        userCache.set(user._doc._id, JSON.stringify(user._doc));
        req.user = user._doc;
        next();
      } else {
        throw Error();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticate;

/*
const noCache = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ msg: "Expired token" });
    }

    const user = await User.findOne({ _id: decoded._id }).select("-password");

    if (user) {
      req.user = user._doc;
      next();
    } else {
      throw Error();
    }
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
*/
