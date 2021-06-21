import {Switch, Route} from "react-router-dom";
import React from 'react';
import PageLoader from "./PageLoader";


export const RouteSwitch = () => (
  <Switch>
    <Route exact path="/">
      <PageLoader pageName="authorized"/>
    </Route>
    <Route path="/login">
      <PageLoader pageName="login"/>
    </Route>
  </Switch>
);
