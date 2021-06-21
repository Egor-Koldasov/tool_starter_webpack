import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import util from 'util';
import React, { Component } from 'react';
import {ServerRouter} from "../bundle/router/server";
import {StaticRouterContext} from "react-router";
import { getBundles } from 'react-loadable-ssr-addon';
import manifest from '../../dist/client/loadable-assets-manifest.json';
import {Capture, preloadAll} from 'react-loadable';

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
  await preloadAll();
  const context: StaticRouterContext = {};
  const modules = new Set();
  const appHtml = ReactDOMServer.renderToString(
    <Capture report={moduleName => {
      console.log('capture', moduleName);
      modules.add(moduleName);
    }}>
      <ServerRouter context={context} url={req.url}/>
    </Capture>
  );
  const modulesToBeLoaded = [...manifest.entrypoints, ...Array.from(modules)];
  const bundles = getBundles(manifest, modulesToBeLoaded);
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
  console.log('modules', modules);
  res.write(`
    <!doctype html>
    <html lang="en">
      <head>
        ${(bundles.css || []).map(style => {
          return `<link href="/bundle/${style.file}" rel="stylesheet" />`;
        }).join('\n')}
      </head>
      <body>
        <div id="appRoot">${appHtml}</div>
        ${(bundles.js || []).map(script => {
          return `<script src="/bundle/${script.file}"></script>`
        }).join('\n')}
    </html>
  `);
  res.end();
  return next();
});

app.listen(3000, () => {
  console.log(`Webpack server is running on port ${port}`);
});
