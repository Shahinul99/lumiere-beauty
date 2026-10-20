// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2hTavl-tIdCD2hzIU2j5a4ZWJG2C8AGI",
  authDomain: "lumiere-beauty-30d13.firebaseapp.com",
  projectId: "lumiere-beauty-30d13",
  storageBucket: "lumiere-beauty-30d13.firebasestorage.app",
  messagingSenderId: "565370550483",
  appId: "1:565370550483:web:78d2250da9c430707a3c26",
  measurementId: "G-C7KH9LRCSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);