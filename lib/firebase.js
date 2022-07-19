import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA8afbhWQGhaWFm6aLHSsZ7Pj_-O3tE4UI",
    authDomain: "portfolio-dedd9.firebaseapp.com",
    projectId: "portfolio-dedd9",
    storageBucket: "portfolio-dedd9.appspot.com",
    messagingSenderId: "227224024928",
    appId: "1:227224024928:web:08509f61dcd46458e89005",
    measurementId: "G-CST4KPKP68"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();