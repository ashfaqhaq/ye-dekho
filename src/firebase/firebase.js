import  firebase  from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage';

const  firebaseConfig =  {
    apiKey: "AIzaSyBZbwNv37LSd46huxS_7zSu4fqrXkBWvMo",
    authDomain: "ye-dekho.firebaseapp.com",
    projectId: "ye-dekho",
    storageBucket: "ye-dekho.appspot.com",
    messagingSenderId: "620450958157",
    appId: "1:620450958157:web:8b8daf3a1c984aca6c8504",
    measurementId: "G-KRBVDWTK2Q"
  };

if (!firebase.apps.length) {
  var firebaseApp =  firebase.initializeApp(firebaseConfig)
}
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
window.firebase = firebaseApp
const auth = firebase.auth();
var storage = firebase.storage();
export { db, auth, storage };