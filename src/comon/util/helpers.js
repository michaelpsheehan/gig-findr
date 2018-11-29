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

