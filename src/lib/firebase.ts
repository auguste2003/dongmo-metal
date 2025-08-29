import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "metal-expressions.firebaseapp.com",
  projectId: "metal-expressions",
  storageBucket: "metal-expressions.appspot.com",
  messagingSenderId: "207635817802",
  appId: "1:207635817802:web:00153b219cb276d4278db3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };
