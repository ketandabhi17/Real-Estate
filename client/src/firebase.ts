// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-46c34.firebaseapp.com",
  projectId: "real-estate-46c34",
  storageBucket: "real-estate-46c34.appspot.com",
  messagingSenderId: "35903093535",
  appId: "1:35903093535:web:b8f0b58d7f7452991b4e2a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
