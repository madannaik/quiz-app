// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxQd5RNuxAD-QA_-8gWEKqrLlie5hsxu4",
  authDomain: "quizx-afdb3.firebaseapp.com",
  projectId: "quizx-afdb3",
  storageBucket: "quizx-afdb3.appspot.com",
  messagingSenderId: "956871966005",
  appId: "1:956871966005:web:d9d7de13fad7ed38bb207c",
  measurementId: "G-MTZ2XJMVDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);