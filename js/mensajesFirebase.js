/*---------------------------MODULO DE APARTADOS LEIDOS----------------------------------------------------------------------------------------*/

/*----------Definir referencias de mensajes-----------*/
var mensajes = firebase.database().ref().child('mensajes');
/*----------funcion crear elementos con datos-----------*/
function crearHtmlMensajesAdmin(data, dataid) {
    
var contenido ='<div class="card-header">\
    \n<h5 class="card-title"><a onClick="colapsarPanel(this)">Nombre: '+data.nombre+' | Asunto: '+data.asunto+'</a></h5>\
	 \n<a class="heading-elements-toggle"><i class="icon-ellipsis font-medium-3"></i></a>\
	\n<div class="heading-elements">\
    \n<ul class="list-inline mb-0">\
    \n<li id="listaIcono"><a onClick="btnColapsar(this)"><i class="icon-plus4"></i></a></li>\
\n<li><a onClick="btnEliminarMensaje(this)" data-id="' + dataid + '"><i class="icon-trash4"></i></a></li>\
\n<li><a onClick="btnCerrar(this)" data-id="' + dataid + '"><i class="icon-cross2"></i></a></li>\
     \n</ul>\
     \n</div>\
	\n</div>\
	\n<div data-colapse="colapsado" class="card-body collapse">\
	\n<div class="card-block">\
\n<div class="card-block">\
         \n<div class="mensajes col-12 col-md-6">\
               \n<p>Nombre</p>\
               \n<h4>'+data.nombre+'</h4>\
               \n<div class="dropdown-divider"></div>\
          \n</div>\
           \n<div class="mensajes col-12 col-md-6">\
               \n<p>Teléfono</p>\
               \n<h4>'+data.telefono+'</h4>\
               \n<div class="dropdown-divider"></div>\
          \n</div>\
          \n<div class="mensajes col-12 col-md-6">\
               \n<p>Correo</p>\
               \n<h4>'+data.correo+'</h4>\
               \n<div class="dropdown-divider"></div>\
          \n</div>\
          \n<div class="mensajes col-12 col-md-6">\
               \n<p>Asunto</p>\
               \n<h4>'+data.asunto+'</h4>\
               \n<div class="dropdown-divider"></div>\
          \n</div>\
          \n<div class="mensajes col-12 col-md-12">\
               \n<p>Mensaje</p>\
               \n<h6>'+data.mensaje+'</h6>\
               \n<div class="dropdown-divider"></div>\
          \n</div>\
	\n</div>\
	\n</div>\
	\n</div>';
return contenido;
}
function btnColapsar(element){
    var hijo=$(element).children('i');
   
      var padre=$(element).parents('li').parents('ul').parents('div').parents('div');
   var clasedata=padre.attr("class");
   var colapsar =padre.next("div");
    var estado=colapsar.data("colapse");
    if(estado=="colapsado"){
        hijo.removeClass('icon-plus4');
        hijo.addClass('icon-minus4');
        colapsar.addClass("in");
        $(colapsar).removeData("colapse");
        $(colapsar).attr("data-colapse","mostrado");
    }else{
        hijo.removeClass('icon-minus4');
        hijo.addClass('icon-plus4');
        colapsar.removeClass("in");
        $(colapsar).removeData("colapse");
        $(colapsar).attr("data-colapse","colapsado");
    }
}
function colapsarPanel(element){
    var padreh5=$(element).parents('h5');
    var hermano=padreh5.siblings('div');
    var hijo=hermano.children('ul').children('li#listaIcono').children('a').children('i');
     var padre=$(element).parents('h5').parents('div');
   var clasedata=padre.attr("class");
   var colapsar =padre.next("div");
    var estado=colapsar.data("colapse");
    if(estado=="colapsado"){
        hijo.removeClass('icon-plus4');
        hijo.addClass('icon-minus4');
        colapsar.addClass("in");
        $(colapsar).removeData("colapse");
        $(colapsar).attr("data-colapse","mostrado");
    }else{
        hijo.removeClass('icon-minus4');
        hijo.addClass('icon-plus4');
        colapsar.removeClass("in");
        $(colapsar).removeData("colapse");
        $(colapsar).attr("data-colapse","colapsado");
    }
}

function btnCerrar(element){
    var cerrar=$(element).data("id");
    $('#'+cerrar).remove();
}
//---Funcion mostrar modal de eliminar apartados
function btnEliminarMensaje(elem) {
    $('#modalEliminarApartado').modal('show');
    var elem = $(elem).data("id");
    $('#btnSiEliminarApartado').attr('data-id', elem);

};
//-----funcion eliminar apartados
$('#btnSiEliminarApartado').click(function (event) {
    var removeid = $(this).data("id");
    mensajes.child(removeid).remove();
    $('#btnSiEliminarApartado').removeData("id");
    $('#modalEliminarApartado').modal('hide');
});
//-----funcion no eliminar apartados
$('button[id=btnNoEliminarApartado]').click(function (event) {
    $('#btnSiEliminarApartado').removeData("id");
    $('#modalEliminarApartado').modal('hide');
});

/*-----Evento child_removed Detecta y Elimina nuevos datos-------*/
mensajes.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});
function recargar(){
    $('#mensajes').children().remove();
    //mostrar();
}
    


