/*----------Inicializacion de firebase-----------*/
/// Your web app's Firebase configuration
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
/////////////--EDISION DE LA PAGINA PRINCIPAL--///////////////////////////////////////////////////////////////////////////////////////
var refAdmin=firebase.database().ref("admin");
var logo=refAdmin.child("logo");
/*-----Evento child_added Detecta y Agrega nuevos datos---------*/
logo.on('value', function(snapshot){
    //añadir elementos
        $('#indexLogo').html('');

    var img=document.createElement("img");
   var src=snapshot.child('src').val();
    var nombre=snapshot.child('nombre').val();
    
    img.setAttribute("src",src);
    img.setAttribute("alt",nombre);
    img.setAttribute("class","img-fluid");
   document.getElementById('indexLogo').appendChild(img);
});

var texto1=refAdmin.child("texto1");
var texto2=refAdmin.child("texto2");
var texto3=refAdmin.child("texto3");
var texto4=refAdmin.child("texto4");
var texto5=refAdmin.child("texto5");

/*-----Evento child_added Detecta y Agrega nuevos datos---------*/
texto1.on('value', function(snapshot){
    //añadir elementos
    var texto=snapshot.val()
$('#texto1').text(texto); 
});
texto2.on('value', function(snapshot){
    //añadir elementos
    var texto=snapshot.val()
$('#texto2').text(texto); 
});
texto3.on('value', function(snapshot){
    //añadir elementos
    var texto=snapshot.val()
$('#texto3').text(texto); 
});
texto4.on('value', function(snapshot){
    //añadir elementos
    var texto=snapshot.val()
$('#texto4').html(texto); 
});
texto5.on('value', function(snapshot){
    //añadir elementos
    var texto=snapshot.val()
$('#texto5').text(texto);
});

var fondo1=refAdmin.child("fondo1");
var fondo2=refAdmin.child("fondo2");
var fondo3=refAdmin.child("fondo3");

fondo1.on('value', function(snapshot){
//añadir elementos
var imgSrc=snapshot.child('src').val();
var imgNombre=snapshot.child('nombre').val();
var eslogan1=snapshot.child('eslogan1').val();
var eslogan2=snapshot.child('eslogan2').val();
$('#fondo1Eslogan1').html('<h2 id="titulo-slider">'+eslogan1+'</h2>');
$('#fondo1Eslogan2').html('<p id="text-slider">'+eslogan2+'</p>');
$('#imgCarrusel1').html('<img class="d-block w-100" src="'+imgSrc+'" alt="'+imgNombre+'">');
});
fondo2.on('value', function(snapshot){
//añadir elementos
var imgSrc=snapshot.child('src').val();
var imgNombre=snapshot.child('nombre').val();
var eslogan1=snapshot.child('eslogan1').val();
var eslogan2=snapshot.child('eslogan2').val();
//$('#fondo1').html('');
$('#fondo2Eslogan1').html('<h2 id="titulo-slider">'+eslogan1+'</h2>');
$('#fondo2Eslogan2').html('<p id="text-slider">'+eslogan2+'</p>');
$('#imgCarrusel2').html('<img class="d-block w-100" src="'+imgSrc+'" alt="'+imgNombre+'">');
});
fondo3.on('value', function(snapshot){
//añadir elementos
var imgSrc=snapshot.child('src').val();
var imgNombre=snapshot.child('nombre').val();
var eslogan1=snapshot.child('eslogan1').val();
var eslogan2=snapshot.child('eslogan2').val();
//$('#fondo1').html('');
$('#fondo3Eslogan1').html('<h2 id="titulo-slider">'+eslogan1+'</h2>');
$('#fondo3Eslogan2').html('<p id="text-slider">'+eslogan2+'</p>');
$('#imgCarrusel3').html('<img class="d-block w-100" src="'+imgSrc+'" alt="'+imgNombre+'">');
});
var contenido1=refAdmin.child("contenido1");
contenido1.on('value', function(snapshot){
//añadir elementos

var titulo=snapshot.child('texto1').val();
var texto=snapshot.child('texto2').val();
$('#contenido1').html('<h2>'+titulo+'</h2><p>'+texto+'</p>');
});
/*----------Visualizar lista -----------*/
var lista1Titulo=refAdmin.child("lista1").child('titulo');
var lista2Titulo=refAdmin.child("lista2").child('titulo');

var lista1Listado=refAdmin.child("lista1").child('listado');
var lista2Listado=refAdmin.child("lista2").child('listado');
//var contenido1=refAdmin.child("contenido1");
lista1Titulo.on('value', function(snapshot){
//añadir elementos
var titulo=snapshot.val();
$('#lista1').html('<p class="eslogan" data-listado="titulo">'+titulo+'</p>');
});
lista2Titulo.on('value', function(snapshot){
//añadir elementos
var titulo=snapshot.val();
$('#lista2').html('<h2 class="eslogan" data-listado="titulo">'+titulo+'</h2>');
});

lista1Listado.on('child_added', function (snapshot) {
//añadir elementos
var data=snapshot.val();
   var creadoLi = document.createElement("li");
    var idLi = snapshot.key;
    creadoLi.setAttribute("id",idLi);
    creadoLi.innerHTML = data.texto;
    document.getElementById('listado1').appendChild(creadoLi); 
});

lista1Listado.on("child_changed", function (snapshot) {
    var data=snapshot.val();
    $('#'+snapshot.key).html(data.texto);
});
lista1Listado.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});
/*----------visualizar listado 2-----------*/

lista2Listado.on('child_added', function (snapshot) {
//añadir elementos
var data=snapshot.val();
   var creadoLi = document.createElement("li");
    var idLi = snapshot.key;
    creadoLi.setAttribute("id",idLi);
    creadoLi.innerHTML = data.texto;
    document.getElementById('listado2').appendChild(creadoLi); 
});

lista2Listado.on("child_changed", function (snapshot) {
    var data=snapshot.val();
    $('#'+snapshot.key).html(data.texto);
});
lista2Listado.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});

/*----------Referencia a cursos-----------*/
var refCursos= firebase.database().ref('cursos');

/*-----Evento child_added Detecta y Agrega nuevos datos-----*/


refCursos.on('child_added', function(snapshot){
    //añadir elementos
    var creadodiv=document.createElement("div");
    var iddiv=snapshot.key;
    creadodiv.setAttribute("id",iddiv);
    creadodiv.setAttribute("class","col-12 col-sm-6 col-md-4 card");
    var data=snapshot.val();
    creadodiv.innerHTML = crearHtml(data,iddiv,"tejalpa");
   document.getElementById('agregarCursos').appendChild(creadodiv); 

});


/*-----Evento child_changed Detecta y Actualiza nuevos datos-------*/
refCursos.on("child_changed", function(snapshot){
   var elementActualizar=document.getElementById(snapshot.key);
   elementActualizar.innerHTML=crearHtml(snapshot.val(),snapshot.key,"tejalpa");
});

/*-----Evento child_removed Detecta y Elimina nuevos datos-------*/
refCursos.on("child_removed", function(snapshot){
   var elementEliminar=document.getElementById(snapshot.key);
    elementEliminar.remove();
});
var refCursosYautepec = firebase.database().ref('cursosyautepec');
refCursosYautepec.on('child_added', function(snapshot){
    //añadir elementos
    var creadodiv=document.createElement("div");
    var iddiv=snapshot.key;
    creadodiv.setAttribute("id",iddiv);
    creadodiv.setAttribute("class","col-12 col-sm-6 col-md-4 card");
    var data=snapshot.val();
    creadodiv.innerHTML = crearHtml(data,iddiv,"yautepec");
   document.getElementById('agregarCursosYautepec').appendChild(creadodiv); 

});
refCursosYautepec.on("child_changed", function(snapshot){
   var elementActualizar=document.getElementById(snapshot.key);
   elementActualizar.innerHTML=crearHtml(snapshot.val(),snapshot.key,"yautepec");
});

/*-----Evento child_removed Detecta y Elimina nuevos datos-------*/
refCursosYautepec.on("child_removed", function(snapshot){
   var elementEliminar=document.getElementById(snapshot.key);
    elementEliminar.remove();
});
/*----------funcion crear elementos con datos-----------*/
function crearHtml(data,dataid,lugar){  
 if(lugar=="tejalpa"){
     var contenido='<div class="cardInterna"><img class="card-img-top" src="'+data.url+'" alt="Card image cap">\
    \n<div class="card-body">\
            \n<h4 class="card-title">' + data.nombre + '</h4>\
            \n<h5 class="card-title">Categoria: ' + data.categoria + '</h5>\
            \n<h5 class="card-title">Cupo: ' + data.cupo + '</h5>\
            \n<p class="card-text">Fecha de Inicio: ' + data.fecha + '</p>\
            \n<p class="card-text">Horarios: ' + data.horario + '</p>\
            \n<p class="card-text">Duración: ' + data.duracion + '</p>\
            \n<p class="card-text">Observaciones: ' + data.observaciones + '</p>\
            \n<button onClick="btnApartarCupo(this)" data-id="' + dataid + '" data-cupo="' +  data.cupo + '" data-lugar="tejalpa" class="btn btn-primary">Apartar Cupo</button>\
        \n</div></div>';
   return contenido;
 }else{
      var contenido='<div class="cardInterna"><img class="card-img-top" src="'+data.url+'" alt="Card image cap">\
    \n<div class="card-body">\
            \n<h4 class="card-title">' + data.nombre + '</h4>\
            \n<h5 class="card-title">Categoria: ' + data.categoria + '</h5>\
            \n<h5 class="card-title">Cupo: ' + data.cupo + '</h5>\
            \n<p class="card-text">Fecha de Inicio: ' + data.fecha + '</p>\
            \n<p class="card-text">Horarios: ' + data.horario + '</p>\
            \n<p class="card-text">Duración: ' + data.duracion + '</p>\
            \n<p class="card-text">Observaciones: ' + data.observaciones + '</p>\
\n<button onClick="btnApartarCupo(this)" data-id="' + dataid + '" data-cupo="' +  data.cupo + '" data-lugar="yautepec" class="btn btn-primary">Apartar Cupo</button>\
        \n</div></div>';
   return contenido;
 }

};

function btnApartarCupo(elemento) {
    
   var cupo=parseInt($(elemento).data("cupo"));
   
    if(cupo>0 || cupo!=null){
        
        var idapartar=$(elemento).data("id");
    var lug=$(elemento).data("lugar");
    $('#modalApartarCurso').modal('show');
        
    $('#btnGuardarApartado').removeData("ida"); 
    $('#btnGuardarApartado').attr('data-ida', idapartar);
    $('#btnGuardarApartado').removeData("lugar");
    $('#btnGuardarApartado').attr('data-lugar',lug);
          
    }else{
     alert("Losentimos ya no hay cupos");
    }  
};
//------funcion de gurdar apartado de curso
$('button[id=btnGuardarApartado]').click(function (event) {
    var id=$(this).data("ida");
    var lugar=$(this).data("lugar");

    if(lugar=="yautepec"){
        var refApartadosNo= firebase.database().ref().child('apartadoyautepec').child('noleido');
        var refApartadosSi= firebase.database().ref().child('apartadoyautepec').child('leido');
    }else{
         var refApartadosNo= firebase.database().ref().child('apartado').child('noleido');
        var refApartadosSi= firebase.database().ref().child('apartado').child('leido');
    }
   
  
     refApartadosNo.push({
    idCurso: id,
    nombre : $('#nombre').val(),
    telefono: $('#telefono').val(),
    celular: $('#celular').val(),
    comentario: $('#comentario').val(),
    hora: hora()
});
       refApartadosSi.push({
    idCurso: id,
    nombre : $('#nombre').val(),
    telefono: $('#telefono').val(),
    celular: $('#celular').val(),
    comentario: $('#comentario').val(),
    hora: hora(),
    aceptado: "no"
});
  cancelar();
  $('#modalMensaje').modal('show');
});
function cancelar(){
     $('#nombre').val("");
    $('#telefono').val("");
    $('#celular').val("");
    $('#comentario').val("");
    $(this).removeData("id");
    $(this).removeData("lugar");
    $('#modalApartarCurso').modal('hide');
}

function hora(){
var tiempo = new Date();
var hora = tiempo.getHours();
var minuto = tiempo.getMinutes();
var segundo = tiempo.getSeconds();
    return hora+':'+minuto+':'+segundo;
}

//--------------------TEMARIOS------------------------------/////////////////////////////////////////////////////////
var refTemarios= firebase.database().ref('temarios');
/*-----Evento child_added Detecta y Agrega nuevos datos-----*/
refTemarios.on('child_added', function(snapshot){
    //añadir elementos
    var creadodivTemario=document.createElement("div");
    var idtemariodiv=snapshot.key;
    creadodivTemario.setAttribute("id",idtemariodiv);
    creadodivTemario.setAttribute("class","col-12 col-sm-6 col-md-4 card card-inverse");
    var data=snapshot.val();
    creadodivTemario.innerHTML = crearHtmlTemario(data,idtemariodiv);
   document.getElementById('agregarTemarios').appendChild(creadodivTemario); 

});

/*-----Evento child_changed Detecta y Actualiza nuevos datos-------*/
refTemarios.on("child_changed", function(snapshot){
   var elementActualizarT=document.getElementById(snapshot.key);
   elementActualizarT.innerHTML=crearHtmlTemario(snapshot.val(),snapshot.key);
});

/*-----Evento child_removed Detecta y Elimina nuevos datos-------*/
refTemarios.on("child_removed", function(snapshot){
   var elementEliminarT=document.getElementById(snapshot.key);
    elementEliminarT.remove();
});


/*----------funcion crear elementos con datos-----------*/
function crearHtmlTemario(data,dataid){  

var contenido='<img class="card-img" src="'+data.urlimagen+'" alt="">\
    \n<div class="card-img-overlay">\
    \n<h4 class="card-title-t">' + data.nombre + '</h4>\
    \n</div>\
 \n<div class="car-body">\
\n<p class="card-text-t">' + data.descripcion + '</p>\
    \n</div>\
\n<div class="row justify-content-center" style="margin-bottom: 10px;">\
\n<button id="btnTemarios" onClick="btnDescargarTemario(this)" data-id="' + dataid + '" data-url="' +  data.urltemario + '" class="btn btn-primary">Ver Temario</button>\
\n</div>';

   return contenido;
};


function btnDescargarTemario(elemento) {
    
   var url=$(elemento).data("url");

    window.open(url);

};

var mapa1=refAdmin.child("mapa1");
var mapa2=refAdmin.child("mapa2");

mapa1.on('value', function(snapshot){
//añadir elementos
    var titulo = snapshot.child('titulo').val();
    var clave = snapshot.child('clave').val();
    var direccion = snapshot.child('direccion').val();
     var descripcion = snapshot.child('descripcion').val();
    var correo = snapshot.child('correo').val();
    var facebook = snapshot.child('facebook').val();
    var telefono = snapshot.child('telefono').val();
    var lati = snapshot.child('latitud').val();
    var longi = snapshot.child('longitud').val();
    var url = snapshot.child('url').val();
$('#tituloMapa1').html('<h3>'+titulo+'</h3>');
$('#infoSede1').html('<ul><li><h4>'+clave+'</h4></li><li><p>'+correo+'</p></li><li><a href="'+facebook+'" target="_blank">'+facebook+'</a></li><li><h5>'+telefono+'</h5></li></ul');
 var data={
        obtitulo:titulo,
        obdescripcion:descripcion,
        obdireccion:direccion,
        oblati:lati,
        oblongi:longi,
        oburl:url
    };
    initMap(data,"mapa1");
    
});
mapa2.on('value', function(snapshot){
//añadir elementos
var titulo = snapshot.child('titulo').val();
    var clave = snapshot.child('clave').val();
    var direccion = snapshot.child('direccion').val();
     var descripcion = snapshot.child('descripcion').val();
    var correo = snapshot.child('correo').val();
    var facebook = snapshot.child('facebook').val();
    var telefono = snapshot.child('telefono').val();
    var lati = snapshot.child('latitud').val();
    var longi = snapshot.child('longitud').val();
    var url = snapshot.child('url').val();
$('#tituloMapa2').html('<h3>'+titulo+'</h3>');
$('#infoSede2').html('<ul><li><h4>'+clave+'</h4></li><li><p>'+correo+'</p></li><li><a href="'+facebook+'" target="_blank">'+facebook+'</a></li><li><h5>'+telefono+'</h5></li></ul');
 var data={
        obtitulo:titulo,
        obdescripcion:descripcion,
        obdireccion:direccion,
        oblati:lati,
        oblongi:longi,
        oburl:url
    };
    initMap(data,"mapa2");  
});
function initMap(data,numMapa) {  
    
        var jiutepec = new google.maps.LatLng(data.oblati,data.oblongi);
        var map = new google.maps.Map(document.getElementById(numMapa), {
          zoom: 19,
          center: jiutepec,
          gestureHandling: 'cooperative'
        });
       imciJiutepect(map,jiutepec,data);
} 
function imciJiutepect(map,jiutepec,data) {
	var contentString = '<div id="pincho" class="container"><div  class="row col-12"><div class="col-12 col-md-6 imagenMapa"><img src="'+data.oburl+'" alt="IMCI JIUTEPEC" class="img-fluid"></div><div class="col-12 col-md-6 contenidoMapa"><h1>'+data.obtitulo+'</h1><p>'+data.obdescripcion+'</p><p>'+data.obdireccion+'</p><span data-lat="'+data.oblati+'" data-long="'+data.oblongi+'" onClick="direccion(this)" class="icon-mapa">Mapa de Google</span></div></div></div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	var marker = new google.maps.Marker({
		map: map,
		position: jiutepec,
		title: data.obtitulo
	});
   infowindow.open(map, marker);
	marker.addListener('click', function () {
        
		infowindow.open(map, marker);
	});
    
}
function direccion(element){
   var lat=$(element).data("lat");
    var long=$(element).data("long");
   var url='https://www.google.com/maps?ll='+lat+','+long+'&z=19&t=m&hl=es-ES&gl=US&mapclient=apiv3' 
    window.open(url);
}


var refBandejaCorreos = firebase.database().ref().child('mensajes');
$('#btnEnviarMensaje').click(function(event){
    var mensajes=[];
     if($('#contactoNombre').val().length==0){
     mensajes.push({
            validar:"error",
            texto:'<p style="text-align: center">No ha ingresado un Nombre, ingrese su nombre por favor.</p>'
        })
 }else{
     	mensajes.push({
            validar:"valido",
            campo:"nombre"
        })
 }
    
    var telefono=document.getElementById('contactoTelefono');
	var valid = "0123456789 .()+-";
	var ok = "yes";
	var temp;
	for (var i=0; i<telefono.value.length; i++) {
		temp = "" + telefono.value.substring(i, i+1);
		if (valid.indexOf(temp) == "-1") ok = "no";
		}
		if (ok == "no" || telefono.value.length==0) {
		mensajes.push({
            validar:"error",
            texto:'<p style="text-align: center">No ha ingresado un Teléfono o es inválido, ingrese su número telefónico por favor.</p>'
        })
      
   }else{
       	mensajes.push({
            validar:"valido",
            campo:"telefono"
        })
   }
    
     var email =$('#contactoCorreo').val();
  var emailPattern =/^[_a-z0-9-]+(\.[_a-z0-9-]+)?@([_a-z0-9-]+\.){1,2}[a-z]{2,3}$/;
  if (!emailPattern.test(email) ||email.length==0){
    mensajes.push({
            validar:"error",
            texto:'<p style="text-align: center">No ha ingresado un Correo o es inválido, escriba su Correo electrónico por favor.</p>'
        })
  }else{
      	mensajes.push({
            validar:"valido",
            campo:"correo"
        })
  }
    
    if($('#contactoAsunto').val().length==0){
     mensajes.push({
            validar:"error",
            texto:'<p style="text-align: center">No ha ingresado un Asunto, ingrese su Asunto por favor.</p>'
        })
 }else{
     	mensajes.push({
            validar:"valido",
            campo:"asunto"
        })
 }
      if($('#contactoMensaje').val().length==0){
     mensajes.push({
            validar:"error",
            texto:'<p style="text-align: center">No ha ingresado un Mensaje, ingrese su Mensaje por favor.</p>'
        })
 }else{
     	mensajes.push({
            validar:"valido",
            campo:"mensaje"
        })
 }  
    var warning="";
    var errores="";
  for (var i=0; i<mensajes.length; i++) {
      var validar=mensajes[i].validar;
      
      if(validar=="error"){
        errores="si";
          warning +=mensajes[i].texto;
      }
  }
 if(errores=="si"){
     $('#alerta').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error campos invalidos! </strong>'+warning+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
 }else{
     refBandejaCorreos.push({
    nombre:$('#contactoNombre').val(),
    telefono:$('#contactoTelefono').val(),
    correo:$('#contactoCorreo').val(),
    asunto:$('#contactoAsunto').val(),
    mensaje:$('#contactoMensaje').val()
});
    $('#contactoNombre').val("");
    $('#contactoTelefono').val("");
    $('#contactoCorreo').val("");
    $('#contactoAsunto').val("");
    $('#contactoMensaje').val(" ");
    //$('#modalMensaje').modal('show');
      $('#alerta').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Mensaje Enviado</strong><p style="text-align: center">Gracias por comunicarte con nosotros.</p><p style="text-align: center">Te contestaremos lo más pronto posible</p><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');  
 }

    
});

 







    /*
var elemento=$("<div>", {
    'class': 'col-12 col-sm-6 col-md-4 card',
       'id': dataid
}).append(
    $('img>', {
        'class': 'card-img-top',
        'src': 'img/cursos/curso1.jpg',
        'alt': 'Card image cap'
    }).append(
      $('<div>',{
         'class': 'card-body'
      }).append(
          $('<h4>',{
            'text': data
          })
        )
    )
    ).hide().appendTo('#agregarCursos').fadeIn('slow');
   */