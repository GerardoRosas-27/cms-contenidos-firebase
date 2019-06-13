/*----------Inicializacion de firebase-----------*/
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
//-----------------------
  
//-----vincular eventos a los btn
    var txtEmail=document.getElementById('txtEmail');
    var txtPassword=document.getElementById('txtPassword');
    var btnLogin=document.getElementById('btnLogin');
    //var btnSignUp=document.getElementById('btnSignUp');
    //var btnLogout=document.getElementById('btnLogout');

btnLogin.addEventListener('click', function(e){
   
    var emaill=txtEmail.value;
    var pass=txtPassword.value;
    // variable de promesa
    var auth=firebase.auth();
    var promise=auth.signInWithEmailAndPassword(emaill, pass);  
    promise.catch(function(e){ 
        console.log(e.message);
    });
});
   /* 
btnSignUp.addEventListener('click', function(e) {
    var emaill=txtEmail.value;
    var pass=txtPassword.value;
    // variable de promesa
    var auth=firebase.auth();
    var promise=auth.createUserWithEmailAndPassword(emaill, pass);
    
    promise.catch(function(e){
       console.log(e.message);
    }); 
});
    */
 /*btnLogout.addEventListener('click',function(e){
     firebase.auth().signOut();
 });
    */
 //añadir un listener en tiempo real
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
         if(user.email=="imciyautepec@outlook.es"){
            window.location = "./cursosYautepec.html";
            
        }else{
             window.location = "./admin.html";
        }
    } else {
        
    }
    });

  
 
    
    //alert("hola "+ nombrebd +" bienbenido a esta prueba");

