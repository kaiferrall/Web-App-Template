import React from "react";

const FormError = props => {
  function formatErrors(err) {
    if (typeof err === "object") {
      return Object.keys(err).map(key => err[key]);
    } else if (typeof err === "string") {
      return [err];
    } else {
      return ["We're sorry something went wrong."];
    }
  }

  if (props.errors) {
    return (
      <div className="form-error-container">
        {formatErrors(props.errors).map((err, index) => {
          return <p key={index}>{err}</p>;
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default FormError;
