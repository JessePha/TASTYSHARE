import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
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
firebase.default.initializeApp(firebaseConfig);
const projectStorage = firebase.default.storage();
const projectFirestore = firebase.default.firestore();
const auth = firebase.default.auth();
export { projectStorage, projectFirestore, auth };
