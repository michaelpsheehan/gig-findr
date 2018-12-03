// import { firestore } from "firebase";
import firebase from "../config/firebase_config";
import cuid from 'cuid';
import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import { FETCH_GIGS } from '../actions/gig_constants'

import { createNewGig, randomGigImage } from '../comon/util/helpers'
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../features/async/async_actions";
// import { ASYNC_ACTION_FINISH, } from "../features/async/async_constants";

export const addGig = (gig) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        //  make an async call to get data
        const firebase = getFirebase();
        const firestore = getFirestore();



        const user = firebase.auth().currentUser;


        const photoURL = getState().firebase.profile.photoURL;

        let newGig = createNewGig(user, photoURL, gig);

        try {
            let createdGig = await firestore.add(`concerts`, newGig);
            await firestore.set(`gig_attendee/${createdGig.id}_${user.uid}`, {
                gigId: createdGig.id,
                userUid: user.uid,

                gigDate: gig.concertDate,
                host: true
            })

            if (gig.cropResult !== null) {



                const gigImageUid = cuid()
                const file = gig.image

                const path = `/gig_images_${createdGig.id}`;
                // console.log('the gig image file ready to upload at line 43 is', gig.image);
                // console.log('the path is', path);

                const options = {
                    name: gigImageUid

                };

                // wait to uploa image 
                let uploadedGigImage = await firebase.uploadFile(path, file, null, options);

                // console.log('the uploadedGigImage is', uploadedGigImage);
                // wait for image downlaod url
                let downloadURL = await uploadedGigImage.uploadTaskSnapshot.ref.getDownloadURL();


                await createdGig.update({


                    gigPhotoURL: downloadURL

                })


            }

            else {
                console.log('image be empty so standard one is used');
                const defaultImage = randomGigImage();
                await createdGig.update({
                    // gigPhotoURL: 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/gig_imagesxoWwR8bqK9grQQptpDP4%2Fcjoqe2gje00003q5z0yz0ulny?alt=media&token=9fcda47c-02ba-41d7-ba55-e315ceac1727'
                    gigPhotoURL: defaultImage


                })

            }










            dispatch({ type: 'CREATE_GIG', gig });
            toastr.success('Success!', 'a new gig has been added');
        } catch (error) {
            dispatch({ type: 'CREATE_GIG_ERROR', error });
            console.log(error)
            toastr.error('Oops something went wrong', error)
        }



    };
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
            console.log('there was an error deleting the photo ', error)
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
            console.log('there was an error changing your profile photo', error);

        }
    }
}



export const updateGig = (gig, id) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        gig.concertDate = moment(gig.concertDate).toDate();

        // console.log('UPDATE GIG ACTION BE LIKE----------  THE GIG AND ID BE', gig, id);


        try {


            if (gig.cropResult !== null) {
                console.log('updated edit image start');
                const gigImageUid = cuid()
                const file = gig.image
                const path = `/gig_images_${id}_edited`

                // console.log('the updated gig image file ready to upload at line 384 is', gig.image);
                // console.log('the path is', path);

                const options = {
                    name: gigImageUid

                };

                // wait to uploaded image 
                let uploadedEditedGigImage = await firebase.uploadFile(path, file, null, options);

                console.log('the edited uploadedEditedGigImage is', uploadedEditedGigImage);

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

                console.log('the gig image is empty');
            }


            toastr.success('Success', 'Your gig has been updated')
        } catch (error) {
            // console.log(error);
            toastr.error('Oops', 'Something went wrong when editing your gig');
        }

    }
}



export const deleteGig = (id) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        // gig.concertDate = moment(gig.concertDate).toDate();
        // console.log('the id in the delete gig ation is ', id);

        try {
            // await firestore.delete(`concerts/${id}`);

            const deleteUrl = await firestore.collection('concerts').doc(id).delete();
            // console.log('the delete url is')

            // console.log('gig deleted')
            toastr.success('Success', 'Your gig has been deleted')
        } catch (error) {
            // console.log(error)
            toastr.error('Oops', 'Something went wrong deleting your gig');
        }
    }
}


export const getGigsForDashboard = () =>
    async (dispatch, getState) => {
        let today = new Date(Date.now());
        const firestore = firebase.firestore();
        const gigQuery = firestore.collection('concerts').where('concertDate', '>=', today);
        console.log(gigQuery);

        try {
            dispatch(asyncActionStart())
            let querySnap = await gigQuery.get();
            let gigs = [];
            for (let i = 0; i < querySnap.docs.length; i++) {
                let gig = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
                gigs.push(gig);
            }

            console.log(querySnap)
            console.log(gigs);

            dispatch({ type: FETCH_GIGS, payload: { gigs } })
            dispatch(asyncActionFinish())


        } catch (error) {
            console.log(error);
            dispatch(asyncActionError())

        }
    }