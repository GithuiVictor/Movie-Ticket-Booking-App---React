 import firebase from 'firebase';
 
 var firebaseConfig = {
    apiKey: "AIzaSyBkxFx6Iid_6QMY_n-vUlPs3rwgAPqfTBM",
    authDomain: "ticket-booking-app-c2d66.firebaseapp.com",
    projectId: "ticket-booking-app-c2d66",
    storageBucket: "ticket-booking-app-c2d66.appspot.com",
    messagingSenderId: "207269504185",
    appId: "1:207269504185:web:cf75be7a8b8d7cbda86768",
    measurementId: "G-0BTHRH3YRB"
  };
  // Initialize Firebase
   var fire = firebase.initializeApp(firebaseConfig);

   export default fire;