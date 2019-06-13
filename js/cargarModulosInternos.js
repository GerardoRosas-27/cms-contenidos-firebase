//---------Login-------------//
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('#usuarioLogeado').text(user.email);   
    } else {
        window.location = "./login.html";
    }
});

var usuario=$('#yautepec').data("user");

if(usuario=="yautepec"){
var numeroCursos = firebase.database().ref().child('cursosyautepec');
    var refApartadosLeidos = firebase.database().ref().child('apartadoyautepec').child('leido');
    var refApartado = firebase.database().ref().child('apartadoyautepec').child('noleido');
    var refCursos = firebase.database().ref('cursosyautepec');
    var configGlobalSonido = firebase.database().ref().child('notificacionesyautepec');
}else{
var numeroCursos = firebase.database().ref().child('cursos');
var refApartadosLeidos = firebase.database().ref().child('apartado').child('leido');
var refApartado = firebase.database().ref().child('apartado').child('noleido'); 
    var refCursos = firebase.database().ref('cursos');
    var configGlobalSonido = firebase.database().ref().child('notificaciones');
}

$('a[id=cerrarSecion]').click(function (event) {
    window.location = "./login.html";
    firebase.auth().signOut();
});

$('input[id=btnSilencio]').click(function(){
    if( $('input[id=btnSilencio]').prop('checked')){
        $('i[id=iconoSonido]').removeAttr("class");
        $('i[id=iconoSonido]').attr("class","icon-android-notifications");
        configGlobalSonido.set("activado");
    }else{
         $('i[id=iconoSonido]').removeAttr("class");
        $('i[id=iconoSonido]').attr("class","icon-android-notifications-off");
        configGlobalSonido.set("desactivado");
    }
});

var numeroEdiciones = firebase.database().ref().child('admin');
//-----funciones de firebase de conteo de datos--------------//
numeroEdiciones.on('value', function (snapshot) {
    $('.numeroEdiciones').text(snapshot.numChildren());
});
//-----funciones de firebase de conteo de datos--------------//
numeroCursos.on('value', function (snapshot) {
    $('.numeroCursos').text(snapshot.numChildren());
});
//-----funciones de firebase de conteo de datos--------------//
refApartadosLeidos.on('value', function (snapshot) {
    $('.numeroApartados').text(snapshot.numChildren());
});
var refTemarios = firebase.database().ref().child('temarios');
//-----funciones de firebase de conteo de datos--------------//
refTemarios.on('value', function (snapshot) {
    $('.numeroTemarios').text(snapshot.numChildren());
});

var mensajes = firebase.database().ref().child('mensajes');
mensajes.on('value', function (snapshot) {
    
    $('.numeroMensajes').text(snapshot.numChildren());
});
/*---------------------MODULO DE MENSAGES DE APARTADOS NO LEIDOS------------------------------------------------------------------------------------------------*/
//-------REFERENCIA A APARTADOS NO LEIDOS
refApartado.on('value', function (snapshot) {
    $('#notificacionApartado').text(snapshot.numChildren());
});
//------Detecta nuevos datos y crea los elementos
refApartado.on('child_added', function (snapshot) {
    //añadir elementos 
     if( $('input[id=btnSilencio]').prop('checked')){
          document.getElementById('alerta').play();
     }
    var creadoa = document.createElement("div");
    var ida = snapshot.key;
    creadoa.setAttribute("id", ida);
    
    creadoa.setAttribute("class", "list-group-item");
    var data = snapshot.val();

    var consulta = refCursos.child(data.idCurso);
    consulta.once("value")
        .then(function (snapshot) {
            var nombre = snapshot.child("nombre").val(); // true
            if (nombre == null) {
                creadoa.innerHTML = crearHtmlMensage(data, ida, "");
            } else {
                creadoa.innerHTML = crearHtmlMensage(data, ida, nombre);
            }
        });
    document.getElementById('listInteresados').appendChild(creadoa);
});

configGlobalSonido.once("value").then(function (snapshot){
    var alerta=snapshot.val();
    if(snapshot.val()=="activado"){
        
        $('i[id=iconoSonido]').removeAttr("class");
        $('i[id=iconoSonido]').attr("class","icon-android-notifications");
        $('input[id=btnSilencio]').attr('checked', true);
    }else{
        $('i[id=iconoSonido]').removeAttr("class");
        $('i[id=iconoSonido]').attr("class","icon-android-notifications-off");
        $('input[id=btnSilencio]').attr('checked', false);
    }
});
//----Funcion crear elementos mensages de apartados
function crearHtmlMensage(data, ida, nombre) {
    var contenido = '<div class="media">\
    \n<div class="media-body">\
    \n<h5 class="media-heading">Curso: ' + nombre + '</h5>\
    \n<h6 class="media-heading">Solicitante: ' + data.nombre + '</h6>\
    \n<p class="notification-text font-small-3 text-muted">Celular: ' + data.celular + '</p>\
    \n<p class="notification-text font-small-3 text-muted">' + data.hora + '</p></div>\
    \n<div class="media-right">\
    \n<button style="margin-top:20px;" onClick="btnEliminarMA(this)" type="button" data-id="' + ida + '" class="btn btn-outline-danger block btn-md"><i class="icon-close"></i></button></div></div>';
    return contenido;
};

/*----------funcion Borrarar mensajes de apartados-----------*/
function btnEliminarMA(element) {
    var datokey = $(element).data("id");
    refApartado.child(datokey).remove();
}
//----Detecta elementoas eliminados y refresca la vista
refApartado.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});


$("#botonCursos").click(function (event) {
    window.location = "./cursos.html";
});
$("#botonApartados").click(function (event) {
    window.location = "./apartados.html";
});
$("#botonPagina").click(function (event) {
    window.location = "./admin.html";
});
$("#botonTemarios").click(function (event) {
    window.location = "./temarios.html";
});
$("#botonMensajes").click(function (event) {
    window.location = "./mensajes.html";
});
$("#mostrarMensajes").click(function (event) {
    window.location = "./mensajes.html";
});


/*-----Evento child_added Detecta y Agrega nuevos datos---------*/

mensajes.on('child_added', function (snapshot) {
    if(usuario=="yautepec"){
     }else{
         if( $('input[id=btnSilencio]').prop('checked')){
          document.getElementById('alerta').play();
     }
   if(usuario=="mensajes"){
    var creadoDiv = document.createElement("div");
    var dataid=snapshot.key;
    creadoDiv.setAttribute("id", dataid);
    creadoDiv.setAttribute("class", "card");
    var data=snapshot.val();
    creadoDiv.innerHTML = crearHtmlMensajesAdmin(data, dataid);
    document.getElementById('mensajes').appendChild(creadoDiv);
 
   }
     }
});


 
 

