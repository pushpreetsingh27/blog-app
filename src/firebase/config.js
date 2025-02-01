// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy0KVrlsND7snP0hNfpS4uOzn_xoVS9gI",
  authDomain: "the-blog-project-d44e5.firebaseapp.com",
  projectId: "the-blog-project-d44e5",
  storageBucket: "the-blog-project-d44e5.firebasestorage.app",
  messagingSenderId: "1062673165726",
  appId: "1:1062673165726:web:fc714ff22c7994e79aba8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();
export default app 