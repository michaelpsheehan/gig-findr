import firebase from "../config/firebase_config";
import cuid from 'cuid';
import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import { FETCH_GIGS } from './gig_constants'
import { createNewGig, randomGigImage } from '../comon/util/helpers'
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../features/async/async_actions";



export const getGigsForDashboard = () =>
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

export const addGig = (gig) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {


        //  make an async call to get data
        const firebase = await getFirebase();
        const firestore = await getFirestore();
        const user = await firebase.auth().currentUser;
        const photoURL = await getState().firebase.profile.photoURL;
        let newGig = await createNewGig(user, photoURL, gig);




        try {
            let createdGig = await firestore.add(`concerts`, newGig);
            await firestore.set(`gig_attendee/${createdGig.id}_${user.uid}`, {
                gigId: createdGig.id,
                userUid: user.uid,
                gigDate: gig.concertDate,
                host: true
            })


            if (gig.files[0]) {
                toastr.success('', 'Your gig photo is being uploaded. This may take up to 1 minute');
                const gigImageUid = cuid()
                const file = gig.image
                const path = `/gig_images_${createdGig.id}`;

                const options = {
                    name: gigImageUid

                };

                // wait to upload image 
                let uploadedGigImage = await firebase.uploadFile(path, file, null, options);


                // wait for image download url
                let downloadURL = await uploadedGigImage.uploadTaskSnapshot.ref.getDownloadURL();


                await createdGig.update({
                    gigPhotoURL: downloadURL
                })
            } else {
                const defaultImage = randomGigImage();
                await createdGig.update({
                    gigPhotoURL: defaultImage
                })
            }

            dispatch({ type: 'CREATE_GIG', gig });

            // refresh gigs after new one is added.

            let today = new Date(Date.now());
            const gigQuery = firestore.collection('concerts').where('concertDate', '>=', today);

            dispatch(asyncActionStart())
            let querySnap = await gigQuery.get();
            let gigs = [];
            for (let i = 0; i < querySnap.docs.length; i++) {
                let gig = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
                gigs.push(gig);
            }

            dispatch({ type: FETCH_GIGS, payload: { gigs } })


            dispatch(asyncActionFinish())

            toastr.success('Success!', 'Your gig has finished uploading');

        } catch (error) {
            dispatch({ type: 'CREATE_GIG_ERROR', error });
            toastr.error('Oops', 'something went wrong while adding your Gig', error.message)

        }
    };
};


export const uploadImage = (file, fileName) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const imageName = cuid();
        const firebase = getFirebase()
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;


        const options = {
            name: imageName
        };

        try {
            // upload the file to the storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);

            // get the url of the image
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
                    name: imageName,
                    url: downloadURL
                })
        } catch (error) {
            toastr.error('Oops', 'Something went wrong uploading your gig');
        }
    };


export const deletePhoto = (photo) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'photos', doc: photo.id }]
            })
        } catch (error) {

            toastr.error('Oops', 'there was an error deleting your photo')
        }
    }


export const setMainPhoto = (photo) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                photoURL: photo.url
            })
        } catch (error) {
            toastr.error('Oops', 'there was an error while updating your profile pic');

        }
    }
}



export const updateGig = (gig, id) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        gig.concertDate = moment(gig.concertDate).toDate();

        try {
            if (gig.files[0]) {
                const gigImageUid = cuid()
                const file = gig.image
                const path = `/gig_images_${id}_edited`

                const options = {
                    name: gigImageUid
                };

                // wait to uploaded image 
                let uploadedEditedGigImage = await firebase.uploadFile(path, file, null, options);
                let downloadURL = await uploadedEditedGigImage.uploadTaskSnapshot.ref.getDownloadURL();

                const editedGig = {
                    band: gig.band,
                    city: gig.city,
                    description: gig.description,
                    venue: gig.venue,
                    concertDate: gig.concertDate,
                    genre: gig.genre,
                    gigPhotoURL: downloadURL
                }

                await firestore.update(`concerts/${id}`, editedGig);
            }
            else {
                const editedGig = {
                    band: gig.band,
                    city: gig.city,
                    description: gig.description,
                    concertDate: gig.concertDate,
                    genre: gig.genre,
                    venue: gig.venue
                }
                await firestore.update(`concerts/${id}`, editedGig);
            }
            // refresh gigs after new one is added.
            let today = new Date(Date.now());
            const gigQuery = firestore.collection('concerts').where('concertDate', '>=', today);

            dispatch(asyncActionStart())
            let querySnap = await gigQuery.get();
            let gigs = [];
            for (let i = 0; i < querySnap.docs.length; i++) {
                let gig = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
                gigs.push(gig);
            }
            dispatch({ type: FETCH_GIGS, payload: { gigs } })
            dispatch(asyncActionFinish())
            toastr.success('Success', 'Your gig has been updated')
        } catch (error) {
            toastr.error('Oops', 'Something went wrong when editing your gig');
        }
    }
}



export const deleteGig = (id) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();


        try {
            await firestore.collection('concerts').doc(id).delete();
            toastr.success('Success', 'Your gig has been deleted')
        } catch (error) {
            toastr.error('Oops', 'Something went wrong deleting your gig');
        }
    }
}
