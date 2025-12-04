import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyBV0IVSC6DzErkBuEjyXa8RFv1FpHURwH4",
  authDomain: "pizzaria-app-3d10e.firebaseapp.com",
  projectId: "pizzaria-app-3d10e",
  storageBucket: "pizzaria-app-3d10e.appspot.com",
  messagingSenderId: "410677403911",
  appId: "1:410677403911:web:7367e5aab46445a187a5a2"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const Auth = getAuth(app);
export const firebaseDatabase = getDatabase(app);

