import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIxk7U97rQjhN9_9xK3mBQNZ5Vx9fWR5U",
  authDomain: "chat-system-230a3.firebaseapp.com",
  projectId: "chat-system-230a3",
  storageBucket: "chat-system-230a3.appspot.com",
  messagingSenderId: "257534375936",
  appId: "1:257534375936:web:e9b9919fc757528748c0e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore();


