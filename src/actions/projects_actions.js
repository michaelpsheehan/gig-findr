import { firestore } from "firebase";

export const createProject = (project) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //  make an async call to get data
        const firestore = getFirestore()
        firestore.collection('projects').add({
            ...project,
            authorFirstName: 'Chuck',
            authorLastName: 'Norris',
            authorId: 12345,
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