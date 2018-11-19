import moment from 'moment'

export const createNewGig = (user, photoURL, gig) => {
    // gig.concertDate = moment(gig.concertDate).toDate();
    console.log('the user  in the helper function is ', user)
    console.log('the user photo url in the helper function is ', photoURL)
    console.log('the user photo url in the helper function is ', gig)
    return {
        ...gig,
        hostUid: user.uid,
        // hostedBy: user.firstName,
        hostPhotoUrl: photoURL || '/public/assets/user.png',
        created: Date.now(),
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