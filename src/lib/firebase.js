// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX_tzHGcSbKb3oqk3hMjE2OBuuF06BzTo",
  authDomain: "tiendaedgarbd.firebaseapp.com",
  projectId: "tiendaedgarbd",
  storageBucket: "tiendaedgarbd.firebasestorage.app",
  messagingSenderId: "38955119649",
  appId: "1:38955119649:web:2d72f8fc97a96543b79f60",
  measurementId: "G-LQ2C31TVHD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
