import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDgHRiLn06Swdm4XpxLsmRBNs4mU12jigk",
    authDomain: "foodnote-c53f5.firebaseapp.com",
    projectId: "foodnote-c53f5",
    storageBucket: "foodnote-c53f5.appspot.com",
    messagingSenderId: "150441433797",
    appId: "1:150441433797:web:3d25e81abbaeee3f1eaeac"
};

const app = initializeApp(firebaseConfig);

export default app;
