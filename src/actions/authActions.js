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



export const signUp = (user) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();


        try {
            // create the user in firebase auth
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            // update the auth profile

            let createdUserId = createdUser.uid;



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

            dispatch({ type: 'SIGNUP_ERROR', err })

        }
    }



export const socialLogin = (selectedProvider) =>
    async (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase();
        try {
            await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            })
            // dispatch
        } catch (error) {

        }
    }









export const updateUserDetails = (updatedDetails) => {

    return async (dipsatch, getState, { getFirebase, getFirestore }) => {
        toastr.success('', 'Your profile is being updated')
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;



        let newDetails = {};
        if (updatedDetails.displayName === '' && updatedDetails.homeTown !== '') {
            newDetails = { homeTown: updatedDetails.homeTown };
        } else if (updatedDetails.homeTown === '' && updatedDetails.displayName !== '') {
            newDetails = { displayName: updatedDetails.displayName };

        } else {
            const { displayName, homeTown } = updatedDetails;
            // newDetails = { ...updatedDetails };
            newDetails = { displayName, homeTown };
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

        }


    }

}


// ---------------------------------------------------------
// ----------------- update password action

export const updatePassword = (credentials) =>
    async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;

        try {

            await user.updatePassword(credentials.newPassword1);
            // await dispatch(reset('account'));
            toastr.success('Success', 'Your password has been changed');


        } catch (err) {


            dispatch({ type: 'SIGNUP_ERROR', err })


        }
    }










