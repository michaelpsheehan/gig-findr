import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/firebase_config';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import rootReducer from './_reducers/root_reducer';
import App from './App';
import './App.scss'
import { composeWithDevTools } from 'redux-devtools-extension'

import * as serviceWorker from './serviceWorker';


const store = createStore(rootReducer,
    // compose(
    composeWithDevTools(

        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true })
    )
);




// --------------------------------------------------------------
// ---------------  delays page load until firebase auth is ready   


store.firebaseAuthIsReady.then(() => {

    ReactDOM.render(
        <Provider store={store} >
            <>
                <ReduxToastr
                    position="bottom-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                />
                <App />
            </>
        </Provider >,
        document.getElementById('root')
    );

})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
