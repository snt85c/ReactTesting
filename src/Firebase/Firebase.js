// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr0zQ8c3Zuw3GM-QBwqeNaosV9v7LF-1U",
  authDomain: "unittestingapp-2e18e.firebaseapp.com",
  projectId: "unittestingapp-2e18e",
  storageBucket: "unittestingapp-2e18e.appspot.com",
  messagingSenderId: "996642872103",
  appId: "1:996642872103:web:df0fa22b10e4c7ff506702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)