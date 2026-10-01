import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "veryaai.firebaseapp.com",
  projectId: "veryaai",
  storageBucket: "veryaai.firebasestorage.app",
  messagingSenderId: "555518922540",
  appId: "1:555518922540:web:6860386be12d7f8090a689",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();