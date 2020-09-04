import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "../components/App";
import Profile from "../components/Profile";
import Github from "../components/Github";

const Routes = () => {
  return (
      <Switch>
          <Route path="/" exact component={App} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/github" exact component={Github} />
      </Switch>
  );
};

export default Routes;
