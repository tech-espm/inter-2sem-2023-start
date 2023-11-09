const firebase = require('firebase/app');
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const config = {
     apiKey: process.env.FIREBASE_APIKEY,
     authDomain: process.env.FIREBASE_AUTHDOMAIN,
     projectId: process.env.FIREBASE_PROJECTID,
     storageBucket: process.env.FIREBASE_STORAGEBUCKET,
     messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
     appId: process.env.FIREBASE_APPID
};

const app = firebase.initializeApp(config);
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = {
     auth,
     storage
} 
