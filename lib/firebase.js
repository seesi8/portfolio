import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8afbhWQGhaWFm6aLHSsZ7Pj_-O3tE4UI",
    authDomain: "portfolio-dedd9.firebaseapp.com",
    projectId: "portfolio-dedd9",
    storageBucket: "portfolio-dedd9.appspot.com",
    messagingSenderId: "227224024928",
    appId: "1:227224024928:web:08509f61dcd46458e89005",
    measurementId: "G-CST4KPKP68"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);