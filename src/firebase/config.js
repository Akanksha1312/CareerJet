import app from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCwFhuvOtyFv1NGOoN0ym8uewmT6kF9lTI",
  authDomain: "job-listing-b230b.firebaseapp.com",
  projectId: "job-listing-b230b",
  storageBucket: "job-listing-b230b.appspot.com",
  messagingSenderId: "375513095605",
  appId: "1:375513095605:web:1587ebbdb6cccf44d48dfc",
};
// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };
