import React, { Component } from "react";
import jwt from "jsonwebtoken";
import keys from "../../config/keys";

//components
import LoadingContainer from "../General/Loading";
import FormError from "../General/Forms/FormError";
import { FormInput, FormSubmit } from "../General/Forms/FormInputs";

//actions
import { resetPassword } from "./api";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirm: "",
      token: "",
      loading: false,
      errors: null,
      messages: null
    };
    this.resetPassword = this.resetPassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  resetPassword(e) {
    e.preventDefault();
    resetPassword(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    try {
      const decoded = jwt.verify(this.props.match.params.token, keys.jwtSecret);
      this.setState({ token: this.props.match.params.token });
    } catch (e) {
      this.setState({
        errors: "Your link has expired get a new one to recover your password."
      });
    }
  }

  render() {
    const { password, confirm, messages, errors, loading } = this.state;
    return (
      <div>
        <form className="form-container">
          <div className="form-title">
            <h1>Reset Password</h1>
          </div>
          <LoadingContainer loading={loading} />
          <FormError errors={errors ? errors.err : null} />
          <FormInput
            onChange={this.onChange}
            value={password}
            name="password"
            type="password"
            placeholder="new password"
            error={errors ? errors.password : null}
          />
          <FormInput
            onChange={this.onChange}
            value={confirm}
            name="confirm"
            type="password"
            placeholder="confirm password"
          />
          <FormSubmit
            text="reset"
            disabled={loading}
            onClick={this.resetPassword}
          />
        </form>
      </div>
    );
  }
}

export default ResetPassword;
