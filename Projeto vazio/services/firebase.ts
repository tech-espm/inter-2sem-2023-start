const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const config = {
     apiKey: '',
     authDomain: '',
     projectId: '',
     storageBucket: '',
     messagingSenderId: '',
     appId: '',
};

firebase.initializeApp(config);
exports.auth = firebase.auth();
exports.firestore = firebase.firestore();
