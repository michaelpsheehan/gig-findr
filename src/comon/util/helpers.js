import moment from 'moment'
import cuid from 'cuid'
export const createNewGig = (user, photoURL, gig) => {
    gig.concertDate = moment(gig.concertDate).toDate();
    // console.log('the user  in the helper function is ', user)
    // console.log('the user photo url in the helper function is ', photoURL)
    // console.log('the user photo url in the helper function is ', gig)

    console.log('the user gig in the helper function is ', gig)
    console.log('the user photofilename in the helper function is ', gig.fileName)
    // const imageName = cuid();
    // gig.fileName = cuid();
    // gig.image = 'dis be an image yo';
    console.log('the user photo filename after the change is ', gig.fileName)




    console.log('the username in the add gig action is', user.displayName)




    return {
        // ...gig,

        band: gig.band,
        city: gig.city,
        description: gig.description,
        // gigPhotoName: gig.fileName,
        // gigImage: gig.image,
        concertDate: gig.concertDate,
        genre: gig.genre,
        venue: gig.venue,


        hostUid: user.uid,
        hostUsername: user.displayName,
        // hostedBy: user.firstName,
        hostPhotoUrl: user.photoURL || '/public/assets/user.png',

        // GigPhotoName: gig.fileName || '',

        // GigPhotoUrl: gig.imageSrc || '/public/assets/user.png',
        createdAt: Date.now(),
        attendees: {
            [user.uid]: {
                going: true,
                joinDate: Date.now(),
                photoURL: photoURL || '/assets/user.png',
                // name: user.firstName,
                host: true
            }
        }

    }
}


export const objectToArray = (object) => {
    if (object) {
        return Object.entries(object).map(e => Object.assign(e[1], { id: e[0] }))
    }
}


export const randomGigImage = () => {
    const imageArray = [
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Faustin-human-768912-unsplash.jpg?alt=media&token=3a4ca7e2-cd18-41dc-a116-e3b0ee4966fc',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Faustin-neill-247047-unsplash.jpg?alt=media&token=9b244d90-df18-4105-b723-862db9025e05',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fband-image-(1).jpg?alt=media&token=bd32c5f0-8053-4def-912b-5d9cb1b3a8ab',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fdiego-sulivan-182118-unsplash.jpg?alt=media&token=6bdc3a86-c858-47f6-8d56-124942e74fb3',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fedward-cisneros-411006-unsplash.jpg?alt=media&token=30166228-1d39-4fd4-8a14-f2437d51b107',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Ffrankie-cordoba-416205-unsplash.jpg?alt=media&token=db4bc1bc-c379-427a-a061-09cc954ea541',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fjay-wennington-393132-unsplash.jpg?alt=media&token=50ede823-d6be-407c-b02e-8570172a5765',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fjazmin-quaynor-36219-unsplash.jpg?alt=media&token=626f94a6-c0fb-4274-97fd-68e5486c4b46',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fjohn-price-27868-unsplash.jpg?alt=media&token=eb450dbd-76b9-49f7-a08a-6e24e181fbd6',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fjon-flobrant-462820-unsplash.jpg?alt=media&token=214f59ed-212c-4857-a502-cce25a14b7c4',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fmelanie-van-leeuwen-17206-unsplash.jpg?alt=media&token=bf23273d-4219-4f11-94d6-5ec025caf54e',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fmelanie-van-leeuwen-83775-unsplash.jpg?alt=media&token=9a56b627-384e-4df0-9ba0-ea8aa26da1d4',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fnainoa-shizuru-80385-unsplash.jpg?alt=media&token=cb801582-c862-4f53-ba9c-a0e353aa6310',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fneonbrand-265869-unsplash.jpg?alt=media&token=7b5ac769-97a3-485c-8f71-c3717c28f9b3',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fneonbrand-350413-unsplash.jpg?alt=media&token=135c24e2-194b-4d12-a77a-79bcb74616c5',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Fpawel-bukowski-3192-unsplash.jpg?alt=media&token=d0a40980-da7c-470d-87bc-cb7e5fad767b',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images%2Frachel-lynette-french-609252-unsplash-lower.jpg?alt=media&token=a647a167-21b5-4190-b9fe-7c06c18d2300'



    ]

    return imageArray[Math.floor(Math.random() * imageArray.length)];


}
