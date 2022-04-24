import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBqil2LiwS8PluUYsK9biJKr0lPSwyZexA",
    authDomain: "newsfeed-app-78f9a.firebaseapp.com",
    projectId: "newsfeed-app-78f9a",
    storageBucket: "newsfeed-app-78f9a.appspot.com",
    messagingSenderId: "350065378941",
    appId: "1:350065378941:web:38e11fcc1a63ba3fa6d314",
    measurementId: "G-GM0EF98WS2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { auth, googleAuthProvider }