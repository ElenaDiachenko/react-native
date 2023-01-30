import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaGUu3hNg5TrtWNo84O5214L4HbXNcpQI",
  authDomain: "test-blog-rn.firebaseapp.com",
  projectId: "test-blog-rn",
  storageBucket: "test-blog-rn.appspot.com",
  messagingSenderId: "315130720548",
  appId: "1:315130720548:web:e9f58dceda301b448203b1",
  measurementId: "G-VPZ6B72WB4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };