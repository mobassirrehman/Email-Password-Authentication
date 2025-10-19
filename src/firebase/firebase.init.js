// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABt5oDWg_sMjAjc3ytO4FviCMDR6sTuIk",
  authDomain: "email-password-authentic-207ff.firebaseapp.com",
  projectId: "email-password-authentic-207ff",
  storageBucket: "email-password-authentic-207ff.firebasestorage.app",
  messagingSenderId: "349160893519",
  appId: "1:349160893519:web:5bb419715068b0d4ae4e3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
