// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkpJq0-2pgJUpX-jlvuGLKJCAOO1DVxdU",
  authDomain: "genzii.firebaseapp.com",
  projectId: "genzii",
  storageBucket: "genzii.appspot.com",
  messagingSenderId: "325837996744",
  appId: "1:325837996744:web:5e45f4d3c1334ece71dbfd",
  measurementId: "G-HFK1N5K1WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app, db
}