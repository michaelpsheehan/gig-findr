import { toastr } from 'react-redux-toastr'
import firebase from 'firebase'
import moment from 'moment'


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
        console.log('the user as the signup auth action starts is ... ', user)
        console.log(user.username)
        console.log(user.email)
        console.log(user.password)

        try {
            // create the user in firebase auth
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            // console.log(createdUser);
            // update the auth profile

            let createdUserId = createdUser.uid;

            console.log('the created user  is -------- ', createdUser);

            await createdUser.user.updateProfile({
                displayName: user.username
            })
            // create a new profile in firestore
            let newUser = {
                displayName: user.username,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            await firestore.set(`users/${createdUser.user.uid}`, { ...newUser })
            // await firestore.collection('users').doc(createdUser.).set(`users/${createdUser.uid}`, { ...newUser })

            // try {
            dispatch({ type: 'SIGNUP_SUCCESS' })

        } catch (err) {
            console.log(err)

            dispatch({ type: 'SIGNUP_ERROR', err })

        }
    }



export const socialLogin = (selectedProvider) =>
    async (dispatch, getState, { getFirebase }) => {
        console.log('the button was presses and the selected provider is ', selectedProvider);
        const firebase = getFirebase();
        try {
            await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            })
            // dispatch
        } catch (error) {
            console.log(error);
        }
    }









export const updateUserDetails = (updatedDetails) => {

    return async (dipsatch, getState, { getFirebase, getFirestore }) => {
        toastr.success('', 'Your profile is being updated')
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;

        console.log('in the updated details action the user object is ', updatedDetails)

        let newDetails = {};
        if (updatedDetails.displayName === '' && updatedDetails.homeTown !== '') {
            newDetails = { homeTown: updatedDetails.homeTown };
        } else if (updatedDetails.homeTown === '' && updatedDetails.displayName !== '') {
            newDetails = { displayName: updatedDetails.displayName };
            console.log('your new display name =================================', newDetails)
        } else {
            newDetails = { ...updatedDetails };
        }




        try {

            // await firebase.updateProfile(updatedDetails);

            await firebase.updateProfile(newDetails);

            await user.updateProfile({
                displayName: newDetails.displayName
            })

            // await user.updateProfile({
            //     displayName: updatedDetails.username
            // })
            toastr.success('Success', 'Your profile was updated')

        }
        catch (error) {
            console.log(error);
        }


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










