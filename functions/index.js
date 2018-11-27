const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello G dudes");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc))
})


exports.concertCreated = functions.firestore
    .document('concerts/{concertId}')
    .onCreate(doc => {
        const concert = doc.data();

        const authorName = admin.firestore().collection('users').doc(concert.hostUid).get();



        const notification = {
            content: 'Added a new Gig',
            user: `Mr ${authorName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
    })

exports.userJoined = functions.auth.user()
    .onCreate(user => {
        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {

                const newUser = doc.data();
                const notification = {
                    content: 'joined the site',

                    user: `${newUser.displayName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            })
    })