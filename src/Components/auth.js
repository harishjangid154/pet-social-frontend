import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Pages/Login";

export default function auth() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/auth/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}
