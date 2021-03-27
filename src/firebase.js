// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlMS4nrnKuGKTJI98Zfd7HGdsUIt_TitM",
  authDomain: "amz-clone-e20bf.firebaseapp.com",
  projectId: "amz-clone-e20bf",
  storageBucket: "amz-clone-e20bf.appspot.com",
  messagingSenderId: "652912015274",
  appId: "1:652912015274:web:7fd8c996174d5b77f09dd3",
  measurementId: "G-DQ91H80WPH"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth= firebase.auth();

  export {db,auth};