import { StaticRouter } from "react-router-dom";
import { StaticRouterContext } from "react-router";
import { RouteSwitch } from "./routes";
import React from 'react';

interface ServerRouterProps {
  url: string,
  context: StaticRouterContext,
};
export const ServerRouter = (props: ServerRouterProps) => (
  <StaticRouter location={props.url} context={props.context}>
    <RouteSwitch/>
  </StaticRouter>
);
