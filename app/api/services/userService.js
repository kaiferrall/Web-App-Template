const User = require("../../database/models/User");
const { serverError } = require("./errorService");
const userCache = require("./cache/userCache");

exports.create = async data => {
  try {
    const user = new User({ ...data });
    const newUser = await user.save();
    if (newUser) delete newUser._doc.password;
    return newUser;
  } catch (e) {
    throw serverError();
  }
};

exports.get = async (query, selection) => {
  try {
    selection = selection ? selection : "";
    const user = await User.findOne(query).select(selection);
    return user;
  } catch (e) {
    throw serverError();
  }
};

exports.getMany = async query => {
  try {
    return await User.find(query);
  } catch (e) {
    throw serverError();
  }
};

exports.update = async userUpdated => {
  try {
    const user = await userUpdated.save();
    if (user) {
      delete user._doc.password;
      userCache.set(user._doc._id, JSON.stringify(user._doc));
    }
    return user;
  } catch (e) {
    throw serverError();
  }
};

exports.updateWithQuery = async (query, updates) => {
  try {
    return await User.updateOne(query, updates, { runValidators: true });
  } catch (e) {
    throw serverError();
  }
};

exports.delete = async query => {
  try {
    await User.deleteOne(query);
    return;
  } catch (e) {
    throw serverError();
  }
};
