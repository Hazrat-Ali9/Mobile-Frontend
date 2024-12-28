 
import { getAuth } from "firebase/auth";

 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// firebase.init
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Firebase init
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAptu8eF_rr79iaiVLrQEX8WV3I5vuCOsI",
  authDomain: "hazrat-ali-mobile-shop.firebaseapp.com",
  projectId: "hazrat-ali-mobile-shop",
  storageBucket: "hazrat-ali-mobile-shop.appspot.com",
  messagingSenderId: "94617539329",
  appId: "1:94617539329:web:347489c343a84dfd4e0100",
  measurementId: "G-36VTNCQGNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth