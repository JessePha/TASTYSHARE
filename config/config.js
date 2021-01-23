import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBlcHfmNg4AXbWkHg72eX5HSCGBcSgteoQ",
  authDomain: "tastyshare-d7978.firebaseapp.com",
  projectId: "tastyshare-d7978",
  storageBucket: "tastyshare-d7978.appspot.com",
  messagingSenderId: "762457080442",
  appId: "1:762457080442:web:6861f5d4e1205e196671c3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
const fc = firebase.functions();
export { projectStorage, projectFirestore, auth, fc };
