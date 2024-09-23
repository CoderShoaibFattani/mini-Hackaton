// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDALosoX2LxotP6ClKnuO5ew8x6DTA334",
  authDomain: "loginsignupforms-5d327.firebaseapp.com",
  projectId: "loginsignupforms-5d327",
  storageBucket: "loginsignupforms-5d327.appspot.com",
  messagingSenderId: "614091831268",
  appId: "1:614091831268:web:4743fc94b89c6ecc9f79f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
