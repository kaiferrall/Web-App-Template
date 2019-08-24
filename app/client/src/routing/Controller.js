import React, { Component } from "react";
import { connect } from "react-redux";

//Loading
import { LoadingDash } from "../components/General/Loading";

import Routes from "./Routes";

class Controller extends Component {
  render() {
    const { user, authenticated, loading } = this.props.auth;
    if (loading) {
      return <LoadingDash />;
    } else {
      return (
        <div>
          <Routes />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Controller);
