import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCtfTUgdjKQqex2ErH5c2hIvx65wNZO0MI",
    authDomain: "apollo-app-394e4.firebaseapp.com",
    projectId: "apollo-app-394e4",
    storageBucket: "apollo-app-394e4.appspot.com",
    messagingSenderId: "1077989636080",
    appId: "1:1077989636080:web:5772d360a9ca894b3d8f35"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
