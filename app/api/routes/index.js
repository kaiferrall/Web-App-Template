const Router = require("express").Router();

const user = require("./user");

Router.use("/user", user);

module.exports = Router;
