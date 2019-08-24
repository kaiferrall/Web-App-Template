import React, { Component } from "react";

//components
import LoadingContainer from "../General/Loading";
import FormError from "../General/Forms/FormError";
import { FormInput, FormSubmit } from "../General/Forms/FormInputs";

//actions
import { register } from "./api";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      confirm: "",
      loading: false,
      errors: null
    };
    this.register = this.register.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  register(e) {
    e.preventDefault();
    register(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, name, password, confirm, errors, loading } = this.state;
    return (
      <div className="form-container">
        <form>
          <div className="form-title">
            <h1>Register</h1>
          </div>
          <LoadingContainer loading={loading} />
          <FormError errors={errors ? errors.err : null} />
          <FormInput
            onChange={this.onChange}
            value={email}
            name="email"
            type="text"
            placeholder="email"
            error={errors ? errors.email : null}
          />
          <FormInput
            onChange={this.onChange}
            value={name}
            name="name"
            type="text"
            placeholder="name"
            error={errors ? errors.name : null}
          />
          <FormInput
            onChange={this.onChange}
            value={password}
            name="password"
            type="password"
            placeholder="password"
            error={errors ? errors.password : null}
          />
          <FormInput
            onChange={this.onChange}
            value={confirm}
            name="confirm"
            type="password"
            placeholder="confirm"
          />
          <FormSubmit
            text="register"
            disabled={loading}
            onClick={this.register}
          />
        </form>
      </div>
    );
  }
}

export default Register;
