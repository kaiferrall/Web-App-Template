import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//components
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

export default function AuthContainer(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/user/authentication-services/recover-password/:token"
          component={ResetPassword}
        />
        <Route>
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}
