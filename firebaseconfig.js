// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCub062sIZYLY47LNtEbTpSlPSy520sul8",
  authDomain: "konekt-2470e.firebaseapp.com",
  projectId: "konekt-2470e",
  storageBucket: "konekt-2470e.appspot.com",
  messagingSenderId: "241052789818",
  appId: "1:241052789818:web:0bd040258d5380d1b65903"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

