import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { reducer as toastrReducer } from 'react-redux-toastr'

import authReducer from './auth_reducer'
import GigReducer from './gig_reducer'
import asyncReducer from '../features/async/async_reducer'



const rootReducer = combineReducers({
    auth: authReducer,
    gig: GigReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    toastr: toastrReducer,
    async: asyncReducer
})


export default rootReducer;
