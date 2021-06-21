import ReactDOM from "react-dom";
import React from 'react';
import { ClientRouter } from "./router/client";
import { preloadReady } from "react-loadable";
const appEl = document.getElementById('appRoot');

(async function() {
  await preloadReady();
  ReactDOM.hydrate(<ClientRouter/>, appEl);
})();