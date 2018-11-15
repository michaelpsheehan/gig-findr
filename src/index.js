// import React from 'react';
// import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/firebase_config';




import rootReducer from './reducers/root_reducer';
import App from './App';

import './index.css';



// import { composeWithDevTools } from 'redux-devtools-extension'

import * as serviceWorker from './serviceWorker';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
const store = createStore(rootReducer,
    compose(

        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true })
    )
);
// + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()




// --------------------------------------------------------------
// ---------------  delays page load until  auth is ready   
// /--------------- will use lazy loading solution 


// store.firebaseAuthIsReady.then(() => {

// })




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
