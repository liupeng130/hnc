import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import Html from '../helpers/Html';
import ApiClient from '../helpers/ApiClient';
import serialize from 'serialize-javascript';
import createStore from '../redux/create';
import {injectSession} from 'jcloudecc/reducer/session';

export default function reactRender(req,res, template, getRoutes,rootReducer,data={}) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req,res);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client, undefined, rootReducer);
  const history = syncHistoryWithStore(memoryHistory, store);
  store.dispatch(injectSession(req.session));
  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }
  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        try {
          const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          res.status(200);
          global.navigator = {userAgent: req.headers['user-agent']};
          const assets = webpackIsomorphicTools.assets();
          // const style = Object.keys(assets.styles).map((style, key) => {
          //   return '<link href="' + assets.styles[style] + '" media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>'
          // });
          const content = component ? ReactDOM.renderToString(component) : '';
          const script = "window.__data="+serialize(store.getState());
          //return {style:style.join(" "),script:script,content :content,js:assets.javascript};
          res.render(template, {css:assets.styles,script:script,content :content,js:assets.javascript,...data});
        }catch(err) {
          console.log(err.stack)
        }
      });
    } else {
      res.status(404).send('Not found');
    }
  });
}