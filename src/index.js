import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { setLogLevel } from "firebase/firestore";


const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_apiKey}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_authDomain}`,
  projectId: `${process.env.REACT_APP_FIREBASE_projectId}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_storageBucket}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_messagingSenderId}`,
  appId: `${process.env.REACT_APP_FIREBASE_appId}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_measurementId}`,
}

initializeApp(firebaseConfig)
setLogLevel("debug")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
