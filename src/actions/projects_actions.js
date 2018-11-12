import { firestore } from "firebase";

export const createProject = (project) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //  make an async call to get data
        const firestore = getFirestore()
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        console.log('the firebase profile in the create project action reducer is', profile)
        console.log('the firebase author id in the create project action reducer is', authorId)




        firestore.collection('concerts').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
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
//      
//         const authorId = getState().firebase.auth.uid;
//       
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