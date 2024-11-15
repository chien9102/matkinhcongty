import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDbGhX_iav4Be5dt83sApd1nwOsyCPK9H8",
  authDomain: "matkinh-7589c.firebaseapp.com",
  projectId: "matkinh-7589c",
  storageBucket: "matkinh-7589c.appspot.com",
  messagingSenderId: "1019126288752",
  appId: "1:1019126288752:web:c765ff820089d64d983fb5",
  measurementId: "G-8BNP58KJH1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();