/*---------------------------MODULO DE APARTADOS LEIDOS----------------------------------------------------------------------------------------*/
var usuario=$('#yautepec').data("user");

if(usuario=="yautepec"){
    console.log("apartado yautepec");
var refApartadosLeidos = firebase.database().ref().child('apartadoyautepec').child('leido');
    var refCursos = firebase.database().ref('cursosyautepec');

}else{
   var refApartadosLeidos = firebase.database().ref().child('apartado').child('leido');
    var refCursos = firebase.database().ref('cursos');
     console.log("apartado admin");
}

/*----------Definir referencias de Apartados leidos-----------*/
/*-----Evento child_added Detecta y Agrega nuevos datos---------*/
refApartadosLeidos.on('child_added', function (snapshot) {

    //añadir elementos
    var creadotr = document.createElement("tr");
    var idtr = snapshot.key;
    creadotr.setAttribute("id", idtr);
    var data = snapshot.val();
    var consulta = refCursos.child(data.idCurso);
    consulta.once("value")
        .then(function (snapshot) {
            var nombre = snapshot.child("nombre").val(); // true
            if (nombre == null) {
                creadotr.innerHTML = crearHtmlApartadosLeidos(data, idtr, "", data.idCurso);
            } else {
                creadotr.innerHTML = crearHtmlApartadosLeidos(data, idtr, nombre, data.idCurso);
            }
        });
    document.getElementById('elementostrApartados').appendChild(creadotr);
});
/*----------funcion crear elementos con datos-----------*/
function crearHtmlApartadosLeidos(data, dataid, nombre, idCurso) {
    if (data.aceptado == "no") {
        var contenido = '<td>' + nombre + '</td>\
    \n<td>' + data.nombre + '</td>\
    \n<td>' + data.telefono + '</td>\
    \n<td>' + data.celular + '</td>\
    \n<td>' + data.comentario + '</td>\
    \n<td>' + data.hora + '</td>\
    \n<td">\
    \n<button style="margin-bottom:10px;" onClick="btnAceptarApartado(this)" type="button" data-curso="' + idCurso + '" data-apartado="' + dataid + '" class="btn btn-outline-success block btn-md"><i class="icon-checkmark-round"></i>Aceptado</button>\
    \n<button style="margin-bottom:10px;" onClick="btnEliminarApartado(this)" type="button" data-id="' + dataid + '" class="btn btn-outline-danger block btn-md"><i class="icon-trash4"></i>Eliminar</button></td>';
        return contenido;
    } else {
        var contenido = '<td>' + nombre + '</td>\
    \n<td>' + data.nombre + '</td>\
    \n<td>' + data.telefono + '</td>\
    \n<td>' + data.celular + '</td>\
    \n<td>' + data.comentario + '</td>\
    \n<td>' + data.hora + '</td>\
    \n<td">\
    \n<button style="margin-bottom:10px;" onClick="btnEliminarApartado(this)" type="button" data-id="' + dataid + '" class="btn btn-outline-danger block btn-md"><i class="icon-trash4"></i>Eliminar</button></td>';
        return contenido;
    }

};

//---Funcion mostrar modal de eliminar apartados
function btnEliminarApartado(elem) {
    $('#modalEliminarApartado').modal('show');
    var elem = $(elem).data("id");
    $('#btnSiEliminarApartado').attr('data-id', elem);

};
//-----funcion eliminar apartados
$('#btnSiEliminarApartado').click(function (event) {
    var removeid = $(this).data("id");
    refApartadosLeidos.child(removeid).remove();
    $('#btnSiEliminarApartado').removeData("id");
    $('#modalEliminarApartado').modal('hide');
});
//-----funcion no eliminar apartados
$('button[id=btnNoEliminarApartado]').click(function (event) {
    $('#btnSiEliminarApartado').removeData("id");
    $('#modalEliminarApartado').modal('hide');
});

/*-----Evento child_removed Detecta y Elimina nuevos datos-------*/
refApartadosLeidos.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});
//---------Evento child_changed detecta los camvios y actualiza apartados--/
refApartadosLeidos.on("child_changed", function (snapshot) {
    var data = snapshot.val();
    var idApartado = snapshot.key;
    var elementActualizar = document.getElementById(idApartado);
    var consulta = refCursos.child(data.idCurso);
    consulta.once("value")
        .then(function (snapshot) {
            var nombre = snapshot.child("nombre").val();
            elementActualizar.innerHTML = crearHtmlApartadosLeidos(data, idApartado, nombre, data.idCurso);
        });

});
//-----Funcion de Aceptar el el apartado del curso----------//
function btnAceptarApartado(aceptado) {
    var idCurso = $(aceptado).data("curso");
    var idApartado = $(aceptado).data("apartado");
    var refcupo = refCursos.child(idCurso);
    refcupo.once("value")
    .then(function (snapshot) {
        var cupo = snapshot.child("cupo").val(); // true
            var cupoActual = (parseInt(cupo)-1);
                 console.log(cupoActual);
                refcupo.child("cupo").set(cupoActual);
                refApartadosLeidos.child(idApartado).child("aceptado").set("si");
    });
};

