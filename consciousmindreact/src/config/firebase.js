import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

//Firebase Project Configuration
const config = {
    apiKey: "AIzaSyCcuq5JJc7yk9TlSY0fTv5jrlADqplGcEA",
    authDomain: "personal-musical-therapy.firebaseapp.com",
    databaseURL: "https://personal-musical-therapy.firebaseio.com/",
    projectId: "personal-musical-therapy"
};




firebase.initializeApp(config);

export const databaseRef = firebase.database().ref();

export const authRef = firebase.auth();
