import firebase from "../config/firebase_config";
// import cuid from 'cuid';
// import moment from 'moment'
// import { toastr } from 'react-redux-toastr'
import { FETCH_GIGS } from './gig_constants'
// import { createNewGig, randomGigImage, refreshGigs } from '../comon/util/helpers'
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../features/async/async_actions";




export const refreshGigsForDashboard = () =>
    async (dispatch, getState) => {
        let today = new Date(Date.now());
        const firestore = firebase.firestore();
        const gigQuery = firestore.collection('concerts').where('concertDate', '>=', today);

        try {
            dispatch(asyncActionStart())
            let querySnap = await gigQuery.get();
            let gigs = [];
            for (let i = 0; i < querySnap.docs.length; i++) {
                let gig = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
                gigs.push(gig);
            }

            dispatch({ type: FETCH_GIGS, payload: { gigs } })
            dispatch(asyncActionFinish())

        } catch (error) {
            dispatch(asyncActionError())
        }
    }
