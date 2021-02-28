import { BrowserRouter } from "react-router-dom";
import { RouteSwitch } from "./routes";
import React from 'react';

export const ClientRouter = () => (
  <BrowserRouter>
    <RouteSwitch/>
  </BrowserRouter>
);
