import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDbcJgNV-pc9CEZ5O5TqAkSWt4auZY2Jk4",
    authDomain: "nwitter-ed500.firebaseapp.com",
    databaseURL: "https://nwitter-ed500.firebaseio.com",
    projectId: "nwitter-ed500",
    storageBucket: "nwitter-ed500.appspot.com",
    messagingSenderId: "446596222529",
    appId: "1:446596222529:web:83cd628bde89bf3271c0c0"
  };

  export default firebase.initializeApp(firebaseConfig);
