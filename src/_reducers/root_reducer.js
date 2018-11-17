import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { reducer as toastrReducer } from 'react-redux-toastr'

import authReducer from './auth_reducer'
import GigReducer from './gig_reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    gig: GigReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    toastr: toastrReducer
})


export default rootReducer;










//  -----------------------------------------------------------------------------
// /-------------original blog one

// const initState = {
//     posts: [
//         { id: '1', title: 'Squirtle Laid an Egg', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' },
//         { id: '2', title: 'Charmander Laid an Egg', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' },
//         { id: '3', title: 'a Helix Fossil was Found', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat' }
//     ]
//     // ,
//     // todos: [
//     //     { id: 1, content: 'todo sample' },
//     //     { id: 2, content: 'play mario kart' }
//     // ]
// }



// const rootReducer = (state = initState, action) => {
//     // console.log(action);

//     if (action.type === 'DELETE_POST') {
//         let newPosts = state.posts.filter(post => {
//             return post.id !== action.id
//         })

//         return {

//             ...state,
//             posts: newPosts
//         }


//     }

//     return state;
// }

// export default rootReducer;
