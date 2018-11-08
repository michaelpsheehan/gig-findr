// import React from 'react';
// import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from 'redux';

import rootReducer from './reducers/root_reducer';
import App from './App';

import './index.css';

import * as serviceWorker from './serviceWorker';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
const store = createStore(
    rootReducer
    // + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);




ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider >,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
