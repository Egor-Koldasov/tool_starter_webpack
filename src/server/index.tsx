import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import util from 'util';
import React from 'react';
import {ServerRouter} from "../bundle/router/server";
import {StaticRouterContext} from "react-router";

const port = 3000;

process.on('uncaughtException', function (err) {
  console.log('uncaughtException: ', err);
});

const bundlePath = path.resolve(__dirname, '..', '..', 'dist', 'client');
const indexHtmlPath = path.resolve(bundlePath, 'index.html');
const readIndexHtml = () =>
  util.promisify(fs.readFile)(indexHtmlPath, 'utf-8');

const app = express();

app.use('/bundle', express.static(bundlePath));
app.get(/.*/, async (req, res, next) => {
  const context: StaticRouterContext = {};
  const appHtml = ReactDOMServer.renderToString(<ServerRouter context={context} url={req.url}/>);
  if (context.url) {
    res.writeHead(301, {Location: context.url});
    res.end();
    return next();
  }
  const indexHtmlMock = await readIndexHtml();
  const indexHtmlFilled =
    indexHtmlMock.replace(
      '<body>',
      `<body><div id="appRoot">${appHtml}</div>`
    );

  res.write(indexHtmlFilled);
  res.end();
  return next();
});

app.listen(3000, () => {
  console.log(`Webpack server is running on port ${port}`);
});
