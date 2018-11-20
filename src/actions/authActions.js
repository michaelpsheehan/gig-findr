import toastr from 'react-redux-toastr'
import firebase from 'firebase'


export const signIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {

            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);

            dispatch({ type: 'LOGIN_SUCCESS' })
        }


        catch (err) {
            dispatch({ type: 'LOGIN_ERROR', err })
        }
    }
}





// export const signIn = (credentials) => {
//     return (dispatch, getState, { getFirebase }) => {
//         const firebase = getFirebase();

//         firebase.auth().signInWithEmailAndPassword(
//             credentials.email,
//             credentials.password
//         ).then(() => {
//             dispatch({ type: 'LOGIN_SUCCESS' })
//         }).catch((err) => {
//             dispatch({ type: 'LOGIN_ERROR', err })
//         });
//     }
// }

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

// export const signUp = (user) =>
//     // console.log(newUser);
//     // return 
//     async (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firebase = getFirebase();
//         const firestore = getFirestore();
//         try {
//             let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
//             // console.log('the created user is ', createdUser)
//             await createdUser.updateProfile({
//                 displayName: user.username
//             })
//             // console.log(newUser)

//             let newUser = {
//                 displayName: user.username,
//                 createdAt: firestore.FieldValue.serverTimestamp()
//             }

//             await firestore.set(`users/${createdUser.uid}`, { ...newUser })


//             // await firestore.collection('users').doc(createdUser.user.uid).set({
//             //     displayName: user.username,
//             //     createdAt: firestore.FieldValue.serverTimestamp()
//             // })

//             // dispatch({ type: 'SIGNUP_SUCCESS' })

//         } catch (err) {
//             console.log(err);
//             // dispatch({ type: 'SIGNUP_ERROR', err })
//         }

//     }





export const signUp = (user) =>

    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            // create the user in firebase auth
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            console.log(createdUser);
            // update the auth profile
            await createdUser.updateProfile({
                displayName: 'bob'
            })
            // create a new profile in firestore
            let newUser = {
                displayName: user.username,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            await firestore.set(`users/${createdUser.uid}`, { ...newUser })

            dispatch({ type: 'SIGNUP_SUCCESS' })

        } catch (err) {
            console.log(err)

            dispatch({ type: 'SIGNUP_ERROR', err })

        }
    }













// dispatch(closeModal());

//         .then((resp) => {
//     return firestore.collection('users').doc(resp.user.uid).set({
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         initials: newUser.firstName[0] + newUser.lastName[0]
//     })
// }).then(() => {
// ---------------------------------------------------------
// ----------------- update password action

export const updatePassword = (credentials) =>
    async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;

        try {
            await user.updatePassword(credentials.newPassword1);
            // await dispatch(reset('account'));
            // toastr.success('Success', 'Your password has been updated');
            console.log('the password was updated successfully');
        } catch (error) {
            console.log('there was an error', error);
            // throw new SubmissionError({
            //     _error: error.message
            // })

        }
    }



