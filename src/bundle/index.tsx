import ReactDOM from "react-dom";
import React from 'react';
import { ClientRouter } from "./router/client";
const appEl = document.getElementById('appRoot');

ReactDOM.hydrate(<ClientRouter/>, appEl);