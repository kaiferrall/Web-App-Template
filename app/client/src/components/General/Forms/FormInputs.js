import React from "react";

export function FormInput(props) {
  return (
    <div className="form-input-container">
      <input {...props} />
      <label className="form-error-label" htmlFor={props.name}>
        {props.error}
      </label>
    </div>
  );
}

export function FormSubmit(props) {
  const { text, ...attributes } = props;
  return (
    <div className="form-submit-container">
      <button type="submit" {...attributes}>
        {props.text ? props.text : "submit"}
      </button>
    </div>
  );
}
