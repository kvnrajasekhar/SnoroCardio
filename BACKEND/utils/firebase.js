// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "snorocode.firebaseapp.com",
  projectId: "snorocode",
  storageBucket: "snorocode.firebasestorage.app",
  messagingSenderId: "57622767599",
  appId: "1:57622767599:web:87795e746165040e5cf81a",
  measurementId: "G-V80SJ6LSBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
export const storage = getStorage()