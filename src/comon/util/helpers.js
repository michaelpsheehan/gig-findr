import moment from 'moment'
import cuid from 'cuid'
export const createNewGig = (user, photoURL, gig) => {
    gig.concertDate = moment(gig.concertDate).toDate();

    return {

        band: gig.band,
        city: gig.city,
        description: gig.description,
        concertDate: gig.concertDate,
        genre: gig.genre,
        venue: gig.venue,
        hostUid: user.uid,
        hostUsername: user.displayName,




        hostPhotoUrl: user.photoURL || '/assets/user.png',




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
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-1-med.jpg?alt=media&token=aac5d9ff-a66c-406d-ba4d-4b227459aac4',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-2.jpg?alt=media&token=7702bfcb-189b-48b9-a353-56aa68cd6f3a',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-3.jpg?alt=media&token=9680c986-e0e0-4f6f-b47e-23d1b4d1855f',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-4.jpg?alt=media&token=99e428e3-4a1a-439d-855a-018aaad3339a',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-5.jpg?alt=media&token=7554e51f-c92d-4a5f-8a4c-502fc781cc7e',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-5.jpg?alt=media&token=7554e51f-c92d-4a5f-8a4c-502fc781cc7e',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-6.jpg?alt=media&token=cd14771d-e1a1-4a12-a5c0-ad9e86c3cb89',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-7.jpg?alt=media&token=2c29ca19-8e19-4a2b-9e20-0a8ae6d88e65',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-8.jpg?alt=media&token=4d97c373-c58a-4bac-9e1c-4be7ffb2b46a',
        // 'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-9.jpg?alt=media&token=1324c2b8-b641-4f8d-9566-532bbb2c5ea8',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-10.jpg?alt=media&token=a39b19ae-7e85-420f-b722-b1d5c0356d5a',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-11.jpg?alt=media&token=246e3116-54fb-4657-a783-0b1c4c194b42',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-12.jpg?alt=media&token=e854fd33-e531-4ccb-9039-2a6374c9485b',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-13.jpg?alt=media&token=18ed3d63-4278-44b1-952c-2fe5cfb20f4c',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-14.jpg?alt=media&token=7ce4745d-282c-4d15-a3a9-b7506f46604d',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-15.jpg?alt=media&token=33245a8b-0d79-4979-b19d-3fa65cdcc354',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-16.jpg?alt=media&token=1c6afef6-e0ec-4d67-849a-1f33e56ebbff',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-17.jpg?alt=media&token=006ae112-7be1-4989-921c-013aaae57329',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-18.jpg?alt=media&token=328b70d8-5197-438a-9b30-fa1f05cd8242',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-19.jpg?alt=media&token=8f1ceca3-3e8b-49c4-ae8a-5d2134acff7e',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-20.jpg?alt=media&token=8bdf0d9c-da45-4353-bd25-aa5416570505',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-21.jpg?alt=media&token=96597ef1-17f0-4a7c-aed0-c8a3cfc4b31f',
        'https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/sample_gig_images_600x338%2Fband-22.jpg?alt=media&token=116c6c0c-e00d-4925-aaf8-c9d025666756'



    ]

    return imageArray[Math.floor(Math.random() * imageArray.length)];


}
