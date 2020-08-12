import Rebase from 're-base';
import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC9ERO-dmO5TaIttJwEp3JdVMQuT7y5Wbw",
    authDomain: "catch-of-the-day-fdegiovanni.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-fdegiovanni.firebaseio.com",
    projectId: "catch-of-the-day-fdegiovanni",
    storageBucket: "catch-of-the-day-fdegiovanni.appspot.com",
    messagingSenderId: "552867721882",
    appId: "1:552867721882:web:3d42901d1e278ca1506523"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

//This is the name export
export { firebaseApp };
//This is the default export
export default base;