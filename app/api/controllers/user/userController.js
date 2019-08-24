const { formError, generalError } = require("../../services/errorService");
const userService = require("../../services/userService");

exports.get = async (req, res) => {
  try {
    const { field, value } = req.params;
    if (field === "password") {
      throw generalError("Unauthorized field", 401, "get", false);
    }
    const user = await userService.get(
      { [field]: value },
      "-password -emailData"
    );
    if (user) {
      return res.json({ status: "good", action: "get", user });
    }
    throw generalError("No user found.", 404, "get", false);
  } catch (e) {
    return res.status(e.meta.statusCode).json({ data: e.data, meta: e.meta });
  }
};
