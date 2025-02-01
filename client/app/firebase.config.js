// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4XIWxveWwdHSN82VJLuTpYi-0_npFikg",
  authDomain: "otp-verifications-d6ce8.firebaseapp.com",
  projectId: "otp-verifications-d6ce8",
  storageBucket: "otp-verifications-d6ce8.appspot.com",
  messagingSenderId: "1017460858835",
  appId: "1:1017460858835:web:2f2f69e3ac3da7a056d926",
  measurementId: "G-P2CWFYK1BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
