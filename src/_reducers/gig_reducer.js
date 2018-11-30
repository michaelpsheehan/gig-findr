import { createReducer } from '../comon/util/reducerUtil'
import { CREATE_GIG, DELETE_GIG, UPDATE_GIG, FETCH_GIGS } from '../actions/gig_constants'

const initialState = {
    concerts: [

    ]
    // projects: [
    //     { id: '1', title: ' the first title of a project', content: 'blah blah blah ' },
    //     { id: '2', title: ' do some tasks that need doing', content: 'the task is a task that is a errand that needs to be completed ' },
    //     { id: '3', title: ' I also need to do this thing', content: 'i also ned to do this ' },
    // ]
}




const GigReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_GIG':
            console.log('created gig', action.project);
            return state;
        case 'CREATE_GIG_ERROR':
            console.log('create gig error', action.err);
            return state;
        default:
            return state;
    }

}



export const fetchGigs = (state, payload) => {
    return payload.gigs
}

// export default GigReducer;

export default createReducer(initialState, {
    // GigReducer
    [FETCH_GIGS]: fetchGigs
});