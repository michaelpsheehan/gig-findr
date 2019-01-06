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
    storageBucket: "task-e5ee4.appspot.com",
    messagingSenderId: "598587213838"
};
firebase.initializeApp(fbConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;