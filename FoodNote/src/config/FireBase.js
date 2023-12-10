import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, push, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDgHRiLn06Swdm4XpxLsmRBNs4mU12jigk",
    authDomain: "foodnote-c53f5.firebaseapp.com",
    databaseURL: "https://foodnote-c53f5-default-rtdb.firebaseio.com",
    projectId: "foodnote-c53f5",
    storageBucket: "foodnote-c53f5.appspot.com",
    messagingSenderId: "150441433797",
    appId: "1:150441433797:web:3d25e81abbaeee3f1eaeac"
};

const app = initializeApp(firebaseConfig);

export { app, getDatabase, ref, get, push, set };