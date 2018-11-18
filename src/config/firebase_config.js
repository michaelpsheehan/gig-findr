// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'


import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Initialize Firebase
var fbConfig = {
    apiKey: "AIzaSyDyWs7Htu1hZje1LpuAnTkrnNmixiFPaVM",
    authDomain: "task-e5ee4.firebaseapp.com",
    databaseURL: "https://task-e5ee4.firebaseio.com",
    projectId: "task-e5ee4",
    // storageBucket: "gs://task-e5ee4.appspot.com",
    storageBucket: "task-e5ee4.appspot.com",
    messagingSenderId: "598587213838"
};
firebase.initializeApp(fbConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;


// var config = {
//     apiKey: "AIzaSyDyWs7Htu1hZje1LpuAnTkrnNmixiFPaVM",
//     authDomain: "task-e5ee4.firebaseapp.com",
//     databaseURL: "https://task-e5ee4.firebaseio.com",
//     projectId: "task-e5ee4",
//     storageBucket: "task-e5ee4.appspot.com",
//     messagingSenderId: "598587213838"
//   };
//   firebase.initializeApp(config);











// storage security rules
// storage

// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow create, read, write
//         // : if request.auth != null;
//       }
//     }
//   }




// database security rules


// service cloud.firestore {
//     match /databases/{database}/documents {
//       match /projects/{project} {
//         allow read, write: if request.auth.uid != null
//       }
//       match /users/{userId} {
//       allow create
//       allow read: if request.auth.uid != null
//       allow write: if request.auth.uid == userId
//       }

//       match /notifications/{notification} {
//         allow read: if request.auth.uid != null
//       }
//       match /concerts/{concert} {
//        allow read
//         allow create, write: if request.auth.uid != null
//       }
//     }
//   }