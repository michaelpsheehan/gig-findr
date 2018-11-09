import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDyWs7Htu1hZje1LpuAnTkrnNmixiFPaVM",
    authDomain: "task-e5ee4.firebaseapp.com",
    databaseURL: "https://task-e5ee4.firebaseio.com",
    projectId: "task-e5ee4",
    storageBucket: "task-e5ee4.appspot.com",
    messagingSenderId: "598587213838"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;