import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "../pages/home";
import { Weather } from "../pages/weather";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Weather} path="/weather" />
      </Switch>
    </BrowserRouter>
  );
};
