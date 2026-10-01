// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "veryaai.firebaseapp.com",
  projectId: "veryaai",
  storageBucket: "veryaai.firebasestorage.app",
  messagingSenderId: "555518922540",
  appId: "1:555518922540:web:6860386be12d7f8090a689"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);