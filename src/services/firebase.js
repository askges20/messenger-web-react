import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/database';
// import withFirebaseAuth from 'react-with-firebase-auth'

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
const auth = firebase.auth;
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

// const database = firebase.database();


export {firestore, auth};
// export {firestore, auth, database};
// export default withFirebaseAuth({firestore, auth, providers});