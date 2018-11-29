// import { firestore } from "firebase";
import { firebase } from "../config/firebase_config";
import cuid from 'cuid';
import moment from 'moment'
import { toastr } from 'react-redux-toastr'

import { createNewGig } from '../comon/util/helpers'

export const addGig = (gig) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        //  make an async call to get data
        const firebase = getFirebase();
        const firestore = getFirestore();
        // const firestoreusertest = firestore.auth().currentUser;
        // console.log('the state of the firestore user test is is du du duuuuh---', firestoreusertest)
        // const user = firestore.auth().currentUser;


        const user = firebase.auth().currentUser;
        // const user = getState().firebase.auth;

        const photoURL = getState().firebase.profile.photoURL;

        let newGig = createNewGig(user, photoURL, gig);

        try {
            let createdGig = await firestore.add(`concerts`, newGig);
            await firestore.set(`gig_attendee/${createdGig.id}_${user.uid}`, {
                gigId: createdGig.id,
                userUid: user.uid,
                // userUid: user,
                gigDate: gig.concertDate,
                host: true
            })

            if (gig.cropResult !== null) {



                const gigImageUid = cuid()
                const file = gig.image
                // const path = `${createdGig.id}/gig_images`;
                const path = `/gig_images_${createdGig.id}`;
                // console.log('the gig image file ready to upload at line 43 is', gig.image);
                // console.log('the path is', path);

                const options = {
                    name: gigImageUid
                    // name: fileName
                };

                // wait to uploa image 
                let uploadedGigImage = await firebase.uploadFile(path, file, null, options);

                // console.log('the uploadedGigImage is', uploadedGigImage);
                // wait for image downlaod url
                let downloadURL = await uploadedGigImage.uploadTaskSnapshot.ref.getDownloadURL();

                // await firestore.add({

                await createdGig.update({
                    // collection: 'concerts',
                    // doc: createdGig.id,
                    // subcollections: [{ collection: 'gig_photos' }]
                    // gigImages: {
                    // name: gigImageUid,
                    // url: downloadURL

                    // [gigImageUid]: {

                    gigPhotoURL: downloadURL
                    // }
                    // }

                    //  name: imageName,
                })


            }

            else {
                console.log('image be empty so standard one is used');
                await createdGig.update({
                    gigPhotoURL: 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/gig_imagesxoWwR8bqK9grQQptpDP4%2Fcjoqe2gje00003q5z0yz0ulny?alt=media&token=9fcda47c-02ba-41d7-ba55-e315ceac1727'


                })

            }












            // const gigImageUid = cuid()
            // const file = gig.image
            // const path = `${createdGig.id}/gig_images`;
            // console.log('the gig image file ready to upload at line 43 is', gig.image);
            // console.log('the path is', path);

            // const options = {
            //     name: gigImageUid
            //     // name: fileName
            // };

            // // wait to uploa image 
            // let uploadedGigImage = await firebase.uploadFile(path, file, null, options);

            // console.log('the uploadedGigImage is', uploadedGigImage);
            // // wait for image downlaod url
            // let downloadURL = await uploadedGigImage.uploadTaskSnapshot.ref.getDownloadURL();
















            //   upload image to storage
            //   upload image to storage


            // get the concert userdoc from firestore

            //  let userDoc = await firestore.get(`concerts/${createdGig.id}`);

            // check if user has photo, if not update profile

            //  if (!userDoc.data().gigPhotoURL) {
            //      await firebase.updateProfile({
            //          gigPhotoURL: downloadURL
            //      });
            //      await user.updateProfile({
            //          gigPhotoURL: downloadURL
            //      });
            //  }
            // add the new photo to photos collection
            // await firestore.set(`gig_photos/${createdGig.id}_${user.uid}`, {
            //     gigId: createdGig.id,
            //     userUid: user.uid,
            //     // userUid: user,
            //     gigDate: gig.concertDate,
            //     host: true
            // })



            // await firestore.add({
            //     collection: 'concerts',
            //     doc: createdGig.id,
            //     subcollections: [{ collection: 'gig_photos' }]
            // }, {
            //         //  name: imageName,
            //         name: gigImageUid,
            //         url: downloadURL
            //     })








            dispatch({ type: 'CREATE_GIG', gig });
            toastr.success('Success!', 'a new gig has been added');
        } catch (error) {
            dispatch({ type: 'CREATE_GIG_ERROR', error });
            console.log(error)
            toastr.error('Oops something went wrong', error)
        }

        // const profile = getState().firebase.profile;
        // const authorId = getState().firebase.auth.uid;




        // -----toastr setup





        // firestore.collection('concerts').add({
        //     ...gig,
        //     authorFirstName: profile.firstName,
        //     authorLastName: profile.lastName,
        //     authorId: authorId,
        //     createdAt: new Date()
        // }).then(() => {

        //     dispatch({ type: 'CREATE_GIG', gig });
        //     toastr.success('Success!', 'Your Gig has been created')
        // })

        //     .catch((err) => {
        //         dispatch({ type: 'CREATE_GIG_ERROR', err });
        //         toastr.error('Oops', 'Something went wrong. Your gig was not added')
        //     })

        // dispatch action to reducers to update state

    };
};







// export const addGig = (gig) => {

//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         //  make an async call to get data



//         const firestore = getFirestore()
//         const profile = getState().firebase.profile;
//         const authorId = getState().firebase.auth.uid;




//         // -----toastr setup





//         firestore.collection('concerts').add({
//             ...gig,
//             authorFirstName: profile.firstName,
//             authorLastName: profile.lastName,
//             authorId: authorId,
//             createdAt: new Date()
//         }).then(() => {

//             dispatch({ type: 'CREATE_GIG', gig });
//             toastr.success('Success!', 'Your Gig has been created')
//         })

//             .catch((err) => {
//                 dispatch({ type: 'CREATE_GIG_ERROR', err });
//                 toastr.error('Oops', 'Something went wrong. Your gig was not added')
//             })

//         // dispatch action to reducers to update state

//     }
// };











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

        console.log('UPDATE GIG ACTION BE LIKE----------  THE GIG AND ID BE', gig, id);


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
                    // name: fileName
                };

                // wait to uploa image 
                let uploadedEditedGigImage = await firebase.uploadFile(path, file, null, options);

                console.log('the edited uploadedEditedGigImage is', uploadedEditedGigImage);
                // wait for image downlaod url
                let downloadURL = await uploadedEditedGigImage.uploadTaskSnapshot.ref.getDownloadURL();



                // await firestore.update(`concerts/${id}`, gig);

                // await updatedGig.update({


                //     gigPhotoURL: downloadURL

                // })
                // console.log('the gig in the update action is', gig);
                // console.log('the id in the update action is', id);
                // const updatedGig = 

                const editedGig = {

                    band: gig.band,
                    city: gig.city,
                    description: gig.description,
                    venue: gig.venue,
                    // gigPhotoName: gig.fileName,
                    // gigImage: gig.image,
                    concertDate: gig.concertDate,
                    genre: gig.genre,
                    gigPhotoURL: downloadURL


                    // hostUid: user.uid,
                    // // hostedBy: user.firstName,
                    // hostPhotoUrl: user.photoURL || '/public/assets/user.png',
                }

                await firestore.update(`concerts/${id}`, editedGig);
            }
            else {

                const editedGig = {

                    band: gig.band,
                    city: gig.city,
                    description: gig.description,
                    // gigPhotoName: gig.fileName,
                    // gigImage: gig.image,
                    concertDate: gig.concertDate,
                    genre: gig.genre,
                    venue: gig.venue,
                    // gigPhotoURL: downloadURL


                    // hostUid: user.uid,
                    // // hostedBy: user.firstName,
                    // hostPhotoUrl: user.photoURL || '/public/assets/user.png',
                }

                await firestore.update(`concerts/${id}`, editedGig);

                console.log('the gig image is empty');
            }


            toastr.success('Success', 'Your gig has been updated')
        } catch (error) {
            console.log(error);
            toastr.error('Oops', 'Something went wrong when editing your gig');
        }

    }
}



export const deleteGig = (id) => {

    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        // gig.concertDate = moment(gig.concertDate).toDate();
        console.log('the id in the delete gig ation is ', id);

        try {
            // await firestore.delete(`concerts/${id}`);

            const deleteUrl = await firestore.collection('concerts').doc(id).delete();
            console.log('the delete url is')




            // await firestore.delete({
            //     collection: 'concerts',
            //     doc: id

            // })

            console.log('gig deleted')
            toastr.success('Success', 'Your gig has been deleted')
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Something went wrong deleting your gig');
        }
    }
}






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