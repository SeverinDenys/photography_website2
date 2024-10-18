import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // TODO make repo private
  apiKey: "AIzaSyCb6dp9i1xCKs2JDYtbgX4ukDOzQDBmCck",
  authDomain: "test-denys-26331.firebaseapp.com",
  projectId: "test-denys-26331",
  storageBucket: "test-denys-26331.appspot.com",
  messagingSenderId: "1038132405700",
  appId: "1:1038132405700:web:b7c73fc744fc6d9bd1f091",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize authorization
const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore(app);

export const storage = getStorage();
export { db, auth };