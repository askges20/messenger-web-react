import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import { getAuth } from 'firebase/auth'; //ver 9
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCwYlqExgXkEafaw52XkxlLP-lwmdfU7a8",
    authDomain: "messenger-webapp-e69a0.firebaseapp.com",
    databaseURL: "https://messenger-webapp-e69a0-default-rtdb.firebaseio.com",
    projectId: "messenger-webapp-e69a0",
    storageBucket: "messenger-webapp-e69a0.appspot.com",
    messagingSenderId: "964962613250",
    appId: "1:964962613250:web:d8eed7e10541d717fecf1b",
    measurementId: "G-3ZD2ENTM8Q"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();  //firestore DB 연결

//firebase ver 9
// const auth = getAuth();
const database = getDatabase();

// firebase ver 8
const auth = firebase.auth;
// const database = firebase.database();


export {firestore, auth, database};