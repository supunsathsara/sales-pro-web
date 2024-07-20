// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "sales-pro-c7d63.firebaseapp.com",
  projectId: "sales-pro-c7d63",
  storageBucket: "sales-pro-c7d63.appspot.com",
  messagingSenderId: "210155176394",
  appId: "1:210155176394:web:04ef85d4e8067287f6cf33",
  measurementId: "G-T52671TC3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//database
const db = getFirestore(app);

export default db;

