import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsJ9x8hctlS9OFjGhwADH2deeQi5-CN38",
  authDomain: "mern-whatsapp-cecfd.firebaseapp.com",
  projectId: "mern-whatsapp-cecfd",
  storageBucket: "mern-whatsapp-cecfd.appspot.com",
  messagingSenderId: "823424567341",
  appId: "1:823424567341:web:b2d919e6e7ea6d93f8d0a4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { app, auth, provider };
