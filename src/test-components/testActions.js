import firebase from '../config/firebase_config'


export const testPermissions = () => {
    return async (dispatch, getState) => {
        const firestore = firebase.firestore();
        try {
            let userDocRef = await firestore.collection('users').doc('oaEIW2UwiwS6fu0fXBXE4yX24M72');
            userDocRef.update({
                displayName: 'change-name-test'
            })
            console.log('trying the unwanted update');
        } catch (error) {
            console.log('there was an error with the dodgy update', error)

        }

    }
}