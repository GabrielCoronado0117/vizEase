// src/firebase.js
// Import the functions you need from the SDKs you need
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTI7hNUiQe5LJlz2F-we5Elyhqlu7nF24",
  authDomain: "vizease-3044a.firebaseapp.com",
  projectId: "vizease-3044a",
  storageBucket: "vizease-3044a.firebasestorage.app",
  messagingSenderId: "709370004484",
  appId: "1:709370004484:web:d664c48c7a4bf6a21e2151",
  measurementId: "G-WH09ZDHJT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Corregido: eliminado firebaseAuth
const db = getFirestore(app);

// Single export statement
export { auth, googleProvider, db };
export default app;