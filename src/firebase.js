import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCwYlqExgXkEafaw52XkxlLP-lwmdfU7a8",
    authDomain: "messenger-webapp-e69a0.firebaseapp.com",
    projectId: "messenger-webapp-e69a0",
    storageBucket: "messenger-webapp-e69a0.appspot.com",
    messagingSenderId: "964962613250",
    appId: "1:964962613250:web:d8eed7e10541d717fecf1b",
    measurementId: "G-3ZD2ENTM8Q"
  };

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {firestore};