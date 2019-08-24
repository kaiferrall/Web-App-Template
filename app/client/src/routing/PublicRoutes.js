import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ConfirmEmail from "../components/Auth/ConfirmEmail";

/**
 * @private false
 * @route   /*
 * @param   none
 */
const Public = props => {
  return (
    <Switch>
      <Route
        exact
        path="/public/user/authentication-services/confirm-email/:token"
        component={ConfirmEmail}
      />
      <Route>
        <div>404</div>
      </Route>
    </Switch>
  );
};

export default Public;
