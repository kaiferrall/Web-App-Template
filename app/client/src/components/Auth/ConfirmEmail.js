import React, { Component } from "react";
import jwt from "jsonwebtoken";
import keys from "../../config/keys";

//components
import { LoadingDash } from "../General/Loading";
import { FullPageMessage } from "../General/FullPageInfo";

//actions
import { confirmEmail } from "./api";

class ConfirmEmail extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      loading: true,
      errors: null,
      messages: null
    };
  }

  componentDidMount() {
    try {
      const decoded = jwt.verify(this.props.match.params.token, keys.jwtSecret);
      this.setState({ token: this.props.match.params.token }, () => {
        confirmEmail(this);
      });
    } catch (e) {
      this.setState({
        errors: "Something went wrong with your verification.",
        loading: false
      });
    }
  }

  render() {
    const { errors, messages, loading } = this.state;
    if (loading) {
      return <LoadingDash />;
    } else if (errors) {
      return (
        <div>
          <p>{errors}</p>
        </div>
      );
    } else if (messages) {
      return <FullPageMessage message={messages} />;
    } else {
      return (
        <div>
          <p>Something went wrong with the verification.</p>
        </div>
      );
    }
  }
}

export default ConfirmEmail;
