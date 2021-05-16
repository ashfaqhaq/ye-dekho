import  firebase  from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage';

const  firebaseConfig = {
  apiKey: "AIzaSyAUb3J9hW0H0NMZvF9PY_H-M_7po1eUAoE",
  authDomain: "reviews-a04e5.firebaseapp.com",
  projectId: "reviews-a04e5",
  storageBucket: "reviews-a04e5.appspot.com",
  messagingSenderId: "311066678590",
  appId: "1:311066678590:web:ab9eb2caf713db7089486f",
  measurementId: "G-BPTD7M7HMN"
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