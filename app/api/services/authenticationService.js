const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const { serverError } = require("./errorService");
const jwt_decode = require("jwt-decode");

exports.salt = async () => {
  try {
    return await bCrypt.genSalt(10);
  } catch (e) {
    throw serverError();
  }
};

exports.hash = async (password, salt) => {
  try {
    return await bCrypt.hash(password, salt);
  } catch (e) {
    throw serverError();
  }
};

exports.comparePasswords = async (inputPass, hashedPass) => {
  try {
    return await bCrypt.compare(inputPass, hashedPass);
  } catch (e) {
    throw serverError();
  }
};

exports.decodeToken = async token => {
  try {
    return await jwt_decode(token);
  } catch (e) {
    throw serverError();
  }
};

exports.verifyToken = token => {
  try {
    return jwt.verify(token, keys.jwtSecret);
  } catch (e) {
    throw serverError();
  }
};

exports.generateToken = async (payload, expiresIn) => {
  try {
    expiresIn = expiresIn ? { expiresIn } : null;
    return await jwt.sign(payload, keys.jwtSecret, expiresIn);
  } catch (e) {
    throw serverError();
  }
};
