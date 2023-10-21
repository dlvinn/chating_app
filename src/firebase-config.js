// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuiZYqSu4bsfKFndUxMHSEtvPGBH8zss8",
  authDomain: "chat-app-de3ea.firebaseapp.com",
  projectId: "chat-app-de3ea",
  storageBucket: "chat-app-de3ea.appspot.com",
  messagingSenderId: "575080693976",
  appId: "1:575080693976:web:bf55662c26d13dbec957ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)