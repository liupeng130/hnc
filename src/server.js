import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import PrettyError from 'pretty-error';
import http from 'http';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';

import pages from './routes/page';
import session from 'express-session';
import config from './config';
import Html from './helpers/Html';
import TemplateEngine from 'swig';
import {injectSession} from 'jcloudecc/reducer/session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import sso from 'jcloudecc/sso/sso';
import ApiClient from './helpers/ApiClient';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: "http://"+config.apiHost,
  changeOrigin:true,
  ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.set('views', path.join(__dirname, 'template'));
var swig = new TemplateEngine.Swig({//开发和线上区别对待
  allowErrors: false,
  autoescape: true,
  cache: false,
  encoding: 'utf8'
});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use('/proxy', (req, res) => {
  console.log("proxy cross domain ajax start")
  proxy.web(req, res);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,limit:"10000kb"}));
app.use(cookieParser());
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret: 'keyboard cat'
}));
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(function (req, res, next) {
    req.session.platformId = 2;
    req.session.domain = {
       home:"aa.com",
       shop:"bb.com"
    }
    next();
})

app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use('/operating-item-view', pages);
app.use('/operating-item-view/sso', function(req, res, next){
  const client = new ApiClient(req, res);
  sso(req, res, client);
});
// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});


if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

