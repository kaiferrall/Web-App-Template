const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};
  email = isEmpty(data.email) ? "" : data.email;
  name = isEmpty(data.name) ? "" : data.name;
  password = isEmpty(data.password) ? "" : data.password;
  confirm = isEmpty(data.confirm) ? "" : data.confirm;

  if (Validator.isEmpty(email)) {
    errors.email = "Email is required.";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email be a valid email address.";
  }

  if (Validator.isEmpty(name)) {
    errors.name = "Name is required.";
  } else if (!Validator.isLength(name, { min: 2, max: 40 })) {
    errors.name = "Your name must be between 2-40 characters.";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Your password is required.";
  } else if (
    Validator.isAlpha(password) ||
    Validator.isLowercase(password) ||
    !Validator.isLength(password, { min: 8, max: 50 })
  ) {
    errors.password =
      "Password must contain atleast one number and uppercase character and must be between 8-50 characters.";
  } else if (password != confirm) {
    errors.password = "Passwords must match.";
  }

  return {
    valid: isEmpty(errors),
    errors: errors
  };
};
