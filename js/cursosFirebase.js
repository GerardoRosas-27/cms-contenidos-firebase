/*----------------------------MODULO CURSOS---------------------------------------------------------------------------------------------------------*/
/*----------Definir referencias de cursos-----------*/


var usuario=$('#yautepec').data("user");

if(usuario=="yautepec"){
    var refCursos = firebase.database().ref('cursosyautepec');
var refImagenes=firebase.storage().ref().child('cursos').child('cursosyautepec');
}else{
     var refCursos = firebase.database().ref('cursos');
var refImagenes=firebase.storage().ref().child('cursos').child('cursosadmin');
}

mostrar();

function mostrar() {
    /*-----Evento child_added Detecta y Agrega nuevos datos---------*/
    refCursos.on('child_added', function (snapshot) {
        var filtro = $('#buscar').val();
        var data = snapshot.val();
        if (filtro.length == 0) {
            //añadir elementos
            var creadotr = document.createElement("tr");
            var idtr = snapshot.key;
            creadotr.setAttribute("id", idtr);
            var data = snapshot.val();
            creadotr.innerHTML = crearHtml(data, idtr);
            document.getElementById('elementostr').appendChild(creadotr);
        } else {
            if (filtro == data.nombre || filtro == data.categoria || filtro == data.cupo || filtro == data.duracion || filtro == data.fecha || filtro == data.horario || filtro == data.observaciones) {
                var creadotr = document.createElement("tr");
                var idtr = snapshot.key;
                creadotr.setAttribute("id", idtr);
                var data = snapshot.val();
                creadotr.innerHTML = crearHtml(data, idtr);
                document.getElementById('elementostr').appendChild(creadotr);
            }
        }
    });
}
/*-----Evento child_changed Detecta y Actualiza nuevos datos-------*/
refCursos.on("child_changed", function (snapshot) {
    var elementActualizar = document.getElementById(snapshot.key);
    elementActualizar.innerHTML = crearHtml(snapshot.val(), snapshot.key);
});

/*-----Evento child_removed Detecta y Elimina nuevos datos-------*/
refCursos.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});

/*----------funcion crear elementos con datos-----------*/
function crearHtml(data, dataid){

    var contenido = '<td>' + data.categoria + '</td>\
    \n<td>' + data.fecha + '</td>\
    \n<td>' + data.horario + '</td>\
    \n<td>' + data.nombre + '</td>\
    \n<td>' + data.duracion + '</td>\
    \n<td>' + data.cupo + '</td>\
    \n<td>' + data.observaciones + '</td>\
    \n<td><img src="' + data.url + '" alt="" class="img-fluid">\
    \n<p>' + data.nombreImg + '</p></td>\
    \n<td">\
    \n<button style="margin-bottom:10px;" onClick="btnEditarCurso(this)" type="button" data-id="' + dataid + '" data-url="' + data.url + '" data-nombreimg="' + data.nombreImg + '" class="btn btn-outline-success block btn-md"><i class="icon-edit"></i>Editar</button>\
    \n<button style="margin-bottom:10px;" onClick="btnEliminarCurso(this)" type="button" data-id="' + dataid + '" data-url="' + data.nombreImg + '" class="btn btn-outline-danger block btn-md"><i class="icon-trash4"></i>Eliminar</button></td>';
    return contenido;
};
$('button[id=modalNuevoCurso]').click(function(event){
     $('#iconModal').modal('show');
});
/*----------funcion clik ingresar datos de cursos----------*/
$("#btnGuardarCurso").click(function (event) {
    event.preventDefault;
    var file = document.getElementById('fileImagenGuardar').files[0];
    if (file) {

        //genera key automatica y guardar datos
        $('#buscar').val("");
        var random = parseInt(Math.random() * 1000000);
        var fileRandon = random.toString() + file.name;
        var refStorage = refImagenes.child(fileRandon);
        var uploadTask = refStorage.put(file);
        uploadTask.on('state_changed', null, function (error) {
            alert("Lo sentimos no se guardaron los datos");
        }, function () {

            
            var datos = refCursos.push({
                categoria: $('#categoria').val(),
                fecha: $('#fecha').val(),
                horario: $('#horario').val(),
                nombre: $('#nombre').val(),
                duracion: $('#duracion').val(),
                cupo: $('#cupo').val(),
                observaciones: $('#observaciones').val(),
                url: uploadTask.snapshot.downloadURL,
                peso: uploadTask.snapshot.totalBytes,
                nombreImg: uploadTask.snapshot.metadata.name,
                path: uploadTask.snapshot.metadata.fullPath
            });
            $('#elementostr').children().remove();
            cancelar();
            mostrar();
        });
    } else {
        alert("selcciona una imagen");
    }
});

//-FUNCIONES EJECUTADAS POR EVENTOS CREADOS COMO ATRIBUTO DE UN ELEMENTO--/
//---Funcion eliminar cursos
function btnEliminarCurso(elem) {
    $('#modalEliminarCurso').modal('show');
    var img = $(elem).data("url");
    var elem = $(elem).data("id");
    $('#btnSiEliminar').attr('data-img', img);
    $('#btnSiEliminar').attr('data-id', elem);
};
//-----funcion si eliminar cursos
$('#btnSiEliminar').click(function (event) {
    var imgEliminar = $(this).data("img");
    var removeid = $(this).data("id");
    var refBorrarImg = refImagenes.child(imgEliminar);
    refBorrarImg.delete().then(function () {
        
        refCursos.child(removeid).remove();
        $('#btnSiEliminar').removeData("id");
        $('#btnSiEliminar').removeData("img");
        $('#modalEliminarCurso').modal('hide');
    }).catch(function (error) {
        alert("Error no se pudo eliminar");
    });

});
//-----funcion no eliminar cursos
$('button[id=btnNoEliminar]').click(function (event) {
    $('#btnSiEliminar').removeData("id");
    $('#btnSiEliminar').removeData("img");
    $('#modalEliminarCurso').modal('hide');
});

//---Funcion editar cursos
function btnEditarCurso(btn) {
    var nombreimg=$(btn).data("nombreimg");
    var url=$(btn).data("url");
    var datakey = $(btn).data("id");
    var p = $(btn).parent();
    $('#modalEditarCursos').modal('show');
    $('#categoriaEditar').val(p.siblings('td')[0].innerHTML);
    $('#fechaEditar').val(p.siblings('td')[1].innerHTML);
    $('#horarioEditar').val(p.siblings('td')[2].innerHTML);
    $('#nombreEditar').val(p.siblings('td')[3].innerHTML);
    $('#duracionEditar').val(p.siblings('td')[4].innerHTML);
    $('#cupoEditar').val(p.siblings('td')[5].innerHTML);
    $('#observacionesEditar').val(p.siblings('td')[6].innerHTML);
    $('#nombreImgActualizar').text(nombreimg);

    $('#btnActualizarCurso').attr('data-imgact', nombreimg);
    $('#btnActualizarCurso').attr('data-urlact', url);
    $('#btnActualizarCurso').attr('data-idact', datakey);                       
};
$('button[id=btnActualizarCurso]').click(function (event) {
      var imgG=$(this).data("imgact");
      var urlG=$(this).data("urlact");
      var datakeyG = $(this).data("idact");
    if(imgG==$('#nombreImgActualizar').text()){
        var actualizar=refCursos.child(datakeyG);
        actualizar.child("categoria").set($('#categoriaEditar').val());
        actualizar.child("fecha").set($('#fechaEditar').val());
        actualizar.child("horario").set($('#horarioEditar').val());
        actualizar.child("nombre").set($('#nombreEditar').val());
        actualizar.child("duracion").set($('#duracionEditar').val());
        actualizar.child("cupo").set($('#cupoEditar').val());
        actualizar.child("observaciones").set($('#observacionesEditar').val());
        actualizar.child("nombreImg").set(imgG);
        actualizar.child("url").set(urlG);
       }else{
           var file = document.getElementById('fileimgActualizar').files[0];
    if (file) {
        var eliminar =imgG;
        var nombre = file.name;
        if (nombre != eliminar) {
            var random = parseInt(Math.random() * 1000000);
        var fileRandon = random.toString() + nombre;
        var imgRef = refImagenes.child(eliminar);
           
            imgRef.delete().then(function () {
                var storageRef = refImagenes.child(fileRandon);
                var uploadTask = storageRef.put(file);
                uploadTask.on('state_changed', null, function (error) {
                    console.log('upload error', error);
                }, function () {
                    // console.log(uploadTask.snapshot);
                    var imageData = {
                        url: uploadTask.snapshot.downloadURL,
                        peso: uploadTask.snapshot.totalBytes,
                        nombreimg: uploadTask.snapshot.metadata.name,
                        path: uploadTask.snapshot.metadata.fullPath
                    }
                   var actualizar=refCursos.child(datakeyG);
        actualizar.child("categoria").set($('#categoriaEditar').val());
        actualizar.child("fecha").set($('#fechaEditar').val());
        actualizar.child("horario").set($('#horarioEditar').val());
        actualizar.child("nombre").set($('#nombreEditar').val());
        actualizar.child("duracion").set($('#duracionEditar').val());
        actualizar.child("cupo").set($('#cupoEditar').val());
        actualizar.child("observaciones").set($('#observacionesEditar').val());
        actualizar.child("nombreImg").set(imageData.nombreimg);
        actualizar.child("url").set(imageData.url);
                });
                
            }).catch(function (error) {
                alert("Error no se pudo Actualizar la imagen");
            });
        } else {
            alert("la imagen es la misma seleciona otra");
        }
    } else {
        alert("Selecciona Una imagen");
    }  
 }
    $('#btnActualizarCurso').removeData("imgact");
    $('#btnActualizarCurso').removeData("urlact");
    $('#btnActualizarCurso').removeData("idact");
      
    //poner funcion de limpiar pendiente
    $('#modalEditarCursos').modal('hide');
});

$('button[id=btnCancelarCursoE]').click(function(){
    $('#btnActualizarCurso').removeData("imgact");
    $('#btnActualizarCurso').removeData("urlact");
    $('#btnActualizarCurso').removeData("idact");
         var input=document.getElementById('fileimgActualizar');
        input.value = ''
if(!/safari/i.test(navigator.userAgent)){
  input.type = ''
  input.type = 'file'
}
    $('#modalEditarCursos').modal('hide');
});


function nombreImagen(event){
  var nombre=$(event).context.files[0].name;
  var escribir=$(event).siblings("label");
    escribir.text(nombre);
};
function cancelar(){
    $('#categoria').val("");
 $('#fecha').val("");
 $('#horario').val("");
 $('#nombre').val("");
 $('#duracion').val("");
 $('#cupo').val("");
 $('#observaciones').val("");
 $('#nombreImgGuardar').text("Seleciona una Imagen");
         var input=document.getElementById('fileImagenGuardar');
        input.value = ''
if(!/safari/i.test(navigator.userAgent)){
  input.type = ''
  input.type = 'file'
}
 $('#iconModal').modal('hide');
}
$('button[id=btnCancelarGuardar]').click(function(){
 cancelar();
});
 

//--funcion buscar texto en la tabla
$('#buscar').keyup(function () {
    var texto = $('#buscar').val();
    if (texto.length == 0) {
        $('#elementostr').children().remove();
        mostrar();
    } else {
        $('#elementostr').children().remove();
        mostrar();
    }

});
//--funcion recargar borra los tr y los restaura 
$('#recargar').click(function () {
    $('#elementostr').children().remove();
    $('#buscar').val("");
    mostrar();
});






//$("#contPrincipal").load('../../../pgiza/index.html');
