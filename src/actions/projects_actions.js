import { firestore } from "firebase";

export const addGig = (gig) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //  make an async call to get data
        const firestore = getFirestore()
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;






        firestore.collection('concerts').add({
            ...gig,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {

            dispatch({ type: 'CREATE_GIG', gig });
        })
            .catch((err) => {
                dispatch({ type: 'CREATE_GIG_ERROR', err });
            }
            )

        // dispatch action to reducers to update state

    }
};



// export const UploadGigImage = (file, fileName) => {
//     async (dispatch, getState, {getFirebase, getFirestore}) => {
//         const firestore = getFirestore();
//         const profile = getState().firebase.profile;
//         const user = firebase.auth().currentUser;
//         const path = `${user.uid}/user_images`;
//         const options = {
//             name: fileName
//         };

//     try {
// // upload the file to the storage
// let uploadedFile = await firebase.uploadedFile(path, file, null , options);
// // get the url of the image
// let downloadUrl = await uploadedFile.uploadTaskSnapshot.downloadURL;
// //  check userdoc
// let userDoc = await firestore.get(`users/${user.uid}`);
// // check if the user has a photo if not update profile with a new image
// if (!userDoc.data().photoURL) {
//     await firebase.updateProfile({
//         photoURL: downloadURL
//     });
//     await user.updateProfile({
//         photoURL: downloadURL
//     })
// }
// // add the new photo to the collection 

// return await
//     }
//     catch (err) {
//         console.log(err);

//     }

// }











// export const CreateGig = (project) => {

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