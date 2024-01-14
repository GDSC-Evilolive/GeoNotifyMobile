// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBGn4X3Bnh3EG4N5WAMAxoyhFbaKJdptFk',
  authDomain: 'geonotify-f2abf.firebaseapp.com',
  projectId: 'geonotify-f2abf',
  storageBucket: 'geonotify-f2abf.appspot.com',
  messagingSenderId: '668287700931',
  appId: '1:668287700931:web:cc67692ae1de953b603776',
  measurementId: 'G-RX4ZHZ9W9P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);
