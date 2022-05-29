// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD9wgMpbYClHpDim3AyCs6BYj6Tfsi4lc",
  authDomain: "fir-project-2-7eff7.firebaseapp.com",
  projectId: "fir-project-2-7eff7",
  storageBucket: "fir-project-2-7eff7.appspot.com",
  messagingSenderId: "523576255863",
  appId: "1:523576255863:web:0a1faaf35ae9e58d6a6d72",
  measurementId: "G-XKEW6EJ6B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)