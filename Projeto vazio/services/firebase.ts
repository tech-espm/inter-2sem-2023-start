const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const config = {
     apiKey: process.env.FIREBASE_APIKEY,
     authDomain: process.env.FIREBASE_AUTHDOMAIN,
     projectId: process.env.FIREBASE_PROJECTID,
     storageBucket: process.env.FIREBASE_STORAGEBUCKET,
     messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
     appId: process.env.FIREBASE_APPID
};

firebase.initializeApp(config);
exports.auth = firebase.auth();
exports.firestore = firebase.firestore();
