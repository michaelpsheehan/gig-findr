import { firestore } from "firebase";

export const createProject = (project) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //  make an async call to get data
        const firestore = getFirestore()
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;



        firestore.collection('concerts').add({
            ...project,
            // authorFirstName: profile.firstName,
            // authorLastName: profile.lastName,
            // authorId: authorId,
            createdAt: new Date()
        }).then(() => {

            dispatch({ type: 'CREATE_PROJECT', project });
        })
            .catch((err) => {
                dispatch({ type: 'CREATE_PROJECT_ERROR', err });
            }
            )

        // dispatch action to reducers to update state

    }
};













// export const createProject = (project) => {

//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         //  make an async call to get data
//         const firestore = getFirestore()
//         const profile = getState().firebase.profile;
//         console.log('the profile id is  ', profile);
//         const authorId = getState().firebase.auth.uid;
//         console.log('the author id is', authorId);
//         firestore.collection('projects').add({
//             ...project,
//             authorFirstName: profile.firstName,
//             authorLastName: profile.lastName,
//             authorId: authorId,
//             createdAt: new Date()
//         }).then(() => {

//             dispatch({ type: 'CREATE_PROJECT', project });
//         })
//             .catch((err) => {
//                 dispatch({ type: 'CREATE_PROJECT_ERROR', err });
//             }
//             )

//         // dispatch action to reducers to update state

//     }
// };