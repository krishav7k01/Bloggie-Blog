// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bloggie-blog.firebaseapp.com",
  projectId: "bloggie-blog",
  storageBucket: "bloggie-blog.appspot.com",
  messagingSenderId: "964616750998",
  appId: "1:964616750998:web:bc2973993f5e990bbd7fb7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);