import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";
import {
  SECRET_KEY,
  SECRET_DOMAIN,
  SECRET_ID,
  SECRET_BUCKET,
  SECRET_SENDERID,
  APP_API,
} from "@env";

var firebaseConfig = {
  apiKey: SECRET_KEY,
  authDomain: SECRET_DOMAIN,
  projectId: SECRET_ID,
  storageBucket: SECRET_BUCKET,
  messagingSenderId: SECRET_SENDERID,
  appId: APP_API,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
const fc = firebase.functions();
export { projectStorage, projectFirestore, auth, fc };
