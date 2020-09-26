import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_AUTH_DOMAIN,
  authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_API_DATABASE_URL,
  projectId: process.env.REACT_APP_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGEN_ID,
  appId: process.env.REACT_APP_API_ID
};

export default firebase.initializeApp(firebaseConfig);
