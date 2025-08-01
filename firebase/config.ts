// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "simplepost-aa947.firebaseapp.com",
  databaseURL: "https://simplepost-aa947-default-rtdb.firebaseio.com",
  projectId: "simplepost-aa947",
  storageBucket: "simplepost-aa947.firebasestorage.app",
  messagingSenderId: "71789732832",
  appId: "1:71789732832:web:da3d93a7f6eaa064550185",
  measurementId: "G-K0PHRV6T5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
