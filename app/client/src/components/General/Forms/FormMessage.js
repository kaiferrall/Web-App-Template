import React from "react";

const FormError = props => {
  return (
    <div className="form-message-container">
      <p>{props.message}</p>
    </div>
  );
};

export default FormError;
