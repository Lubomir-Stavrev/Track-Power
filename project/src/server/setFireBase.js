

import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCKJc85IX3FGMfxT3eZHehnQbRZ1N34WVs",
    authDomain: "track-power.firebaseapp.com",
    databaseURL: "https://track-power-default-rtdb.firebaseio.com",
    projectId: "track-power",
    storageBucket: "track-power.appspot.com",
    messagingSenderId: "441340319323",
    appId: "1:441340319323:web:d3708b08d0537876dd517e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const userModel = firebase.auth();


export default userModel;