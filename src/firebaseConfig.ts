import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkADtEcqPCZg948nV7i73W3-svA1B4Deo",
  authDomain: "pomofocus-613e4.firebaseapp.com",
  projectId: "pomofocus-613e4",
  storageBucket: "pomofocus-613e4.firebasestorage.app",
  messagingSenderId: "212901313702",
  appId: "1:212901313702:web:9d1d58cd07f29f2eda0867",
  measurementId: "G-19PZLBPJQB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
