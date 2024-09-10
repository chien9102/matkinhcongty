import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCddkNL6L-hgo16AdROrZZdBwvtTMYVRhE",
    authDomain: "eyeglasses-51304.firebaseapp.com",
    projectId: "eyeglasses-51304",
    storageBucket: "eyeglasses-51304.appspot.com",
    messagingSenderId: "636187785605",
    appId: "1:636187785605:web:b32d9e34a29deb9ea02cec",
    measurementId: "G-74HFN1BL62"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();