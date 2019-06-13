/*----------Inicializacion de firebase-----------*/
// Initialize Firebase
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBI-u8YqTCvatDjgI-QeT64Ew4vpzGhp88",
    authDomain: "imcidemo.firebaseapp.com",
    databaseURL: "https://imcidemo.firebaseio.com",
    projectId: "imcidemo",
    storageBucket: "imcidemo.appspot.com",
    messagingSenderId: "346465256348",
    appId: "1:346465256348:web:b3cdd8ae578e9a7c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//---------Login-------------//
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
          if(user.email=="imciyautepec@outlook.es"){
             window.location = "./cursosYautepec.html";
        }
    } else {
        window.location = "./login.html";
    }
});
