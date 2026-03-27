import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt8lx9hoHM3fHTxpfo2gwawE4pmR4GAVY",
  authDomain: "story-messenger-a5dd5.firebaseapp.com",
  databaseURL: "https://story-messenger-a5dd5-default-rtdb.firebaseio.com",
  projectId: "story-messenger-a5dd5",
  storageBucket: "story-messenger-a5dd5.appspot.com",
  messagingSenderId: "1009676292624",
  appId: "1:1009676292624:web:a3f53581dbc4231a623095",
  measurementId: "G-C8MBXKJ719",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
