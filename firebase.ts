import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE0Eg2QF1faYtxgjsenuuQnG-q2ZDll1I",
  authDomain: "planora-f2dad.firebaseapp.com",
  projectId: "planora-f2dad",
  storageBucket: "planora-f2dad.firebasestorage.app",
  messagingSenderId: "158560715940",
  appId: "1:158560715940:web:7af19b4427297083645231"
};

// Initialize Firebase
const app = getApps().length === 0 ?  initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};