// src/firebaseConfig.js
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyCJ0e-eXVNZklonFVZAfKJtMqtOUEmAHVI',
  authDomain: 'safeguard-b37e1.firebaseapp.com',
  projectId: 'safeguard-b37e1',
  storageBucket: 'safeguard-b37e1.appspot.com',
  messagingSenderId: '638953688574',
  appId: '1:638953688574:android:328c0e37ff5c7efa7404af',
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);