import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configStore } from 'redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
const el = document.getElementById('root');
const root = ReactDom.createRoot(el);

root.render(
  <Provider store={createStore(reducers, applyMiddleware(reduxThunk))}>
    <App />
  </Provider>
);
