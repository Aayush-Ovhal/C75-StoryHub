import firebase from 'firebase'
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAyCNsHFRfEXazn8MXD9WNRdDxLskoUWr4",
  authDomain: "story-hub-realtime.firebaseapp.com",
  databaseURL: "https://story-hub-realtime.firebaseio.com",
  projectId: "story-hub-realtime",
  storageBucket: "story-hub-realtime.appspot.com",
  messagingSenderId: "255212372925",
  appId: "1:255212372925:web:d30c092a849f7f6d8148d4"
};

firebase.initializeApp(firebaseConfig);

export default  firebase.firestore();