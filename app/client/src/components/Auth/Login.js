import React, { Component } from "react";

//components
import LoadingContainer from "../General/Loading";
import FormError from "../General/Forms/FormError";
import { FormInput, FormSubmit } from "../General/Forms/FormInputs";

//actions
import { login } from "./api";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: null
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(e) {
    e.preventDefault();
    login(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <div className="form-container">
        <form>
          <div className="form-title">
            <h1>Login</h1>
          </div>
          <LoadingContainer loading={loading} />
          <FormError errors={errors ? errors.err : null} />
          <FormInput
            className="form-input"
            onChange={this.onChange}
            value={email}
            name="email"
            type="text"
            placeholder="email"
            error={errors ? errors.email : null}
          />
          <FormInput
            className="form-input"
            onChange={this.onChange}
            value={password}
            name="password"
            type="password"
            placeholder="password"
            error={errors ? errors.password : null}
          />
          <FormSubmit text="login" disabled={loading} onClick={this.login} />
        </form>
      </div>
    );
  }
}

export default Login;
