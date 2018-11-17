import { firestore } from "firebase";
import cuid from 'cuid';

import { toastr } from 'react-redux-toastr'

export const addGig = (gig) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //  make an async call to get data



        const firestore = getFirestore()
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;




        // -----toastr setup





        firestore.collection('concerts').add({
            ...gig,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {

            dispatch({ type: 'CREATE_GIG', gig });
            toastr.success('Success!', 'Your Gig has been created')
        })

            .catch((err) => {
                dispatch({ type: 'CREATE_GIG_ERROR', err });
                toastr.error('Oops', 'Something went wrong. Your gig was not added')
            })

        // dispatch action to reducers to update state

    }
};



export const uploadImage = (file, fileName) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const imageName = cuid();
        // const fileName = cuid();
        const firebase = getFirebase()
        const firestore = getFirestore();
        // const profile = getState().firebase.profile;
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;


        const options = {
            // name: fileName
            name: imageName
        };

        try {
            // upload the file to the storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            // get the url of the image


            // let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;

            // let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // let downloadURL = await uploadedFile.snapshot.ref.getDownloadURL();


            // get the userdoc from firestore
            let userDoc = await firestore.get(`users/${user.uid}`);
            // check if user has photo, if not update profile
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                });
            }
            // add the new photo to photos collection
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'photos' }]
            }, {
                    //  name: imageName,
                    name: imageName,
                    url: downloadURL
                })
            // /dispatch(asyncActionFinish())
        } catch (error) {
            // dispatch(asyncActionError())
            // throw new Error('Problem uploading photo')
            console.log('Problem uploading photo')
            console.log(error);
        }
    };
























        //         //  check userdoc
        //         let userDoc = await firestore.get(`users/${user.uid}`);
        //         // check if the user has a photo if not update profile with a new image
        //         if (!userDoc.data().photoURL) {
        //             await firebase.updateProfile({
        //                 photoURL: downloadURL
        //             });
        //             await user.updateProfile({
        //                 photoURL: downloadURL
        //             })
        //         }
        //         // add the new photo to the collection 

        //         // return 
        //         await firestore.add({
        //             collection: 'users',
        //             doc: user.uid,
        //             subcollections: [{ collection: 'photos' }]
        //         }, {
        //                 name: fileName,
        //                 url: downloadURL
        //             })
        //     } catch (err) {
        //         console.log(err);
        //         throw new Error('problem uploading photo')
        //     }

        // }







































//     //  check userdoc
//     let userDoc = await firestore.get(`users/${user.uid}`);
//     // check if the user has a photo if not update profile with a new image
//     if (!userDoc.data().photoURL) {
//         await firebase.updateProfile({
//             photoURL: downloadURL
//         });
//         await user.updateProfile({
//             photoURL: downloadURL
//         })
//     }
//     // add the new photo to the collection 

//     return await firestore.add({
//         collection: 'users',
//         doc: user.uid,
//         subcollections: [{ collection: 'photos' }]
//     }, {
//             name: fileName,
//             url: downloadURL
//         })
// } catch (err) {
//     console.log(err);
//     throw new Error('problem uploading photo')
// }

// }