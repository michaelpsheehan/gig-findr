import { createReducer } from '../comon/util/reducerUtil'
import { CREATE_GIG, FETCH_GIGS } from '../actions/gig_constants'

const initialState = {
    concerts: [],
    newGigAdded: false
}




const GigReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GIG:
            return state;
        case 'CREATE_GIG_ERROR':
            return state;
        default:
            return state;
    }

}



export const fetchGigs = (state, payload) => {
    return payload.gigs
}



export default createReducer(initialState, {

    [FETCH_GIGS]: fetchGigs

});