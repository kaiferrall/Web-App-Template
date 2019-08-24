exports.formError = (data, action, display) => {
  let error = new Error();
  error.data = typeof data === "object" ? data : { err: data };
  error.meta = { type: "form", statusCode: 400, display, action };
  return error;
};

exports.generalError = (data, statusCode, action, display) => {
  let error = new Error();
  error.data = typeof data === "object" ? data : { err: data };
  error.meta = { type: "general", statusCode, display, action };
  return error;
};

exports.serverError = context => {
  let error = new Error();
  error.data = "Something went wrong.";
  error.meta = {
    type: "server",
    statusCode: 500,
    display: true,
    context: context ? context : "internal server error."
  };
  return error;
};
