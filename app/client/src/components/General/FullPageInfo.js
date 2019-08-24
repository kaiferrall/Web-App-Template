import React from "react";

export const FullPageError = props => {
  return (
    <div className="full-page-error-container">
      <p>{props.error}</p>
    </div>
  );
};

export const FullPageMessage = props => {
  return (
    <div className="full-page-message-container">
      <p>{props.message}</p>
    </div>
  );
};
