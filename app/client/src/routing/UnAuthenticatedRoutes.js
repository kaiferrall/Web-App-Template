import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//componenets
import AuthContainer from "../components/Auth/AuthContainer";
import Landing from "../components/General/Landing";

/**
 * @private false
 * @route   /*
 * @param   none
 */
export default function UnAuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/user" component={AuthContainer} />
      <Route exact path="/" component={Landing} />
      <Route>
        <div>404</div>
      </Route>
    </Switch>
  );
}
