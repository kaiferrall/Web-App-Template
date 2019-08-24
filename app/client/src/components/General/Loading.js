import React from "react";

import loadingSpinner from "../../assets/loading_circular.gif";

import loadingLinear from "../../assets/loading_linear";

//For application loading
export const LoadingDash = props => {
  return (
    <div className="loading-container row">
      <img style={{ width: "200px" }} src={loadingLinear} />
    </div>
  );
};

//For forms
export const LoadingCircular = props => {
  return (
    <div className="form-loader-container">
      <img src={loadingSpinner} />
    </div>
  );
};

const LoadingContainer = props => {
  return props.loading ? <LoadingCircular /> : null;
};

export default LoadingContainer;
