// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVMiRELmz0kuKYXLfeVjBc5CyRPtuXb8Q",
  authDomain: "uber-2-yt-7b5a9.firebaseapp.com",
  projectId: "uber-2-yt-7b5a9",
  storageBucket: "uber-2-yt-7b5a9.appspot.com",
  messagingSenderId: "374210656199",
  appId: "1:374210656199:web:ba5c9f3f6f7862f581cbe2"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
