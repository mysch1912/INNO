import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH-F7uKHyKld0dx5NUfkUj5lW2GwFdFfk",
  authDomain: "inno-3db9d.firebaseapp.com",
  projectId: "inno-3db9d",
  storageBucket: "inno-3db9d.firebasestorage.app",
  messagingSenderId: "908341025773",
  appId: "1:908341025773:web:b6a45fc090efed2851e5e4",
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(firebaseApp);

// Realtime Database
export const rtdb = getDatabase(
  firebaseApp,
  "https://inno-3db9d-default-rtdb.europe-west1.firebasedatabase.app"
);