/*----------------------------MODULO CURSOS---------------------------------------------------------------------------------------------------------*/
/*----------Definir referencias de cursos-----------*/
var refTemarios = firebase.database().ref('temarios');
mostrar();

function mostrar() {
    /*-----Evento child_added Detecta y Agrega nuevos datos---------*/
    refTemarios.on('child_added', function (snapshot) {
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
            if (filtro == data.nombre || filtro == data.descripcion || filtro == data.temario) {
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
refTemarios.on("child_changed", function (snapshot) {
    var elementActualizar = document.getElementById(snapshot.key);
    elementActualizar.innerHTML = crearHtml(snapshot.val(), snapshot.key);
});

/*-----Evento child_removed Detecta y Elimina nuevos datos-------*/
refTemarios.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});

/*----------funcion crear elementos con datos-----------*/
function crearHtml(data, dataid) {

    var contenido = '<td>' + data.nombre + '</td>\
    \n<td>' + data.descripcion + '</td>\
    \n<td><img src="' + data.urlimagen + '" alt="" class="img-fluid"><p>' + data.imagen + '</p></td>\
    \n<td><button style="margin-bottom:10px; width: 250px;" onClick="btnVerTemario(this)" type="button" data-id="' + dataid + '" data-url="' + data.urltemario + '" class="btn btn-outline-primary block btn-md"><i class="icon-eye"></i>Ver documento</button><iframe src ="'+data.urltemario+'"  style ="width: 250px; height: 360px;" frameborder = '+0+'> </iframe>\
    \n<p>' + data.temario + '</p></td>\
    \n<td">\
    \n<button style="margin-bottom:10px;" onClick="btnEliminarTemarios(this)" type="button" data-id="' + dataid + '" data-nombre="' + data.temario + '" data-nombreimg="' + data.imagen + '" class="btn btn-outline-danger block btn-md"><i class="icon-trash4"></i>Eliminar</button></td>';
    return contenido;
};

/*----------Pendiente editar temario
 \n<button style="margin-bottom:10px;" onClick="btnEditarTemarios(this)" type="button" data-id="' + dataid + '" data-nombre="' + data.temario + '" data-url="' + data.url + '" class="btn btn-outline-success block btn-md"><i class="icon-edit"></i>Editar</button>\
-----------*/


/*----------funcion clik ingresar datos de cursos----------*/
$("#btnGuardarTemario").click(function (event) {
    var file1 = document.getElementById('temarioTemarios').files[0];
     var file2 = document.getElementById('imagenTemarios').files[0];
    if (file1 || file2) {
        //genera key automatica y guardar datos
        $('#buscar').val("");
        var random = parseInt(Math.random() * 1000000);
        var fileRandon = random.toString() + file1.name;
        var refStorage = firebase.storage().ref().child('temarios/' + fileRandon);
        var uploadTask = refStorage.put(file1);
        uploadTask.on('state_changed', null, function (error) {
            alert("Lo sentimos no se guardaron los datos");
        }, function () {
           var data={
                nombre: $('#nombre').val(),
                descripcion: $('#descripcion').val(),
                urlt: uploadTask.snapshot.downloadURL,
                pesot: uploadTask.snapshot.totalBytes,
                tem: uploadTask.snapshot.metadata.name,
                patht: uploadTask.snapshot.metadata.fullPath
             }
        //genera key automatica y guardar datos
        var random2 = parseInt(Math.random() * 1000000);
        var fileRandon2 = random2.toString() + file2.name;
        var refStorage2 = firebase.storage().ref().child('temarios/' + fileRandon2);
        var uploadTask2 = refStorage2.put(file2);
        uploadTask2.on('state_changed', null, function (error) {
            alert("Lo sentimos no se guardaron los datos");
        }, function () {
             
            var refTemarios2 = firebase.database().ref('temarios');
            refTemarios2.push({
                nombre: $('#nombre').val(),
                descripcion: $('#descripcion').val(),
                urlimagen: uploadTask2.snapshot.downloadURL,
                pesoimagen: uploadTask2.snapshot.totalBytes,
                imagen: uploadTask2.snapshot.metadata.name,
                pathimagen: uploadTask2.snapshot.metadata.fullPath,
                urltemario: data.urlt,
                pesotemario: data.pesot,
                temario: data.tem,
                pathtemario: data.patht
            });
            $('#elementostr').children().remove();
            //limpiar casillas
       cancelar();      
     mostrar();
});
        });
    } else {
       alert("selecciona una Imagen y un Temario");
    }
});

//-FUNCIONES EJECUTADAS POR EVENTOS CREADOS COMO ATRIBUTO DE UN ELEMENTO--/
//---Funcion eliminar cursos
function btnVerTemario(elemnt){
       var url=$(elemnt).data("url");
    console.log(url);
    window.open(url);
}
function btnEliminarTemarios(elem) {
    $('#modalEliminarCurso').modal('show');
    var id = $(elem).data("id");
    var temario = $(elem).data("nombre");
    var imagen = $(elem).data("nombreimg");
    $('#btnSiEliminar').attr('data-idtem', id);
     $('#btnSiEliminar').attr('data-tem', temario);
     $('#btnSiEliminar').attr('data-img', imagen);


};
//-----funcion si eliminar cursos
$('#btnSiEliminar').click(function (event) {
 
    var temarioEliminar = $(this).data("tem");
    var imagenEliminar = $(this).data("img");
    var removeid = $(this).data("idtem");

    var refBorrarTemario = firebase.storage().ref().child('temarios/'+temarioEliminar);
    refBorrarTemario.delete().then(function () {
        
        
       var refBorrarImagen =  firebase.storage().ref().child('temarios/'+imagenEliminar);
    refBorrarImagen.delete().then(function () {
        var refTemario = firebase.database().ref('temarios');
        refTemario.child(removeid).remove();
        $('#btnSiEliminar').removeData("idtem");
        $('#btnSiEliminar').removeData("tem");
        $('#btnSiEliminar').removeData("img");
        $('#modalEliminarCurso').modal('hide');
    }).catch(function (error) {
        alert("Error no se pudo eliminar");
    });
        
 
    }).catch(function (error) {
        alert("Error no se pudo eliminar");
    });

});
//-----funcion no eliminar cursos
$('button[id=btnNoEliminar]').click(function (event) {
  $('#btnSiEliminar').removeData("idtem");
    $('#btnSiEliminar').removeData("tem");
     $('#btnSiEliminar').removeData("img");
    $('#modalEliminarCurso').modal('hide');
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

function nombreImagen(event){
  var nombre=$(event).context.files[0].name;
  var escribir=$(event).siblings("label");
    escribir.text(nombre);
};
function cancelar(){
    $('#nombre').val("");
    $('#descripcion').val("");
    $('#nombreImagen').text("Seleciona una Imagen");
    $('#nombreTemario').text("Seleciona un Temario");
    var input1=document.getElementById('imagenTemarios');
    input1.value = ''
if(!/safari/i.test(navigator.userAgent)){
  input1.type = ''
  input1.type = 'file'
}
    var input2=document.getElementById('temarioTemarios');
    input2.value = ''
if(!/safari/i.test(navigator.userAgent)){
  input2.type = ''
  input2.type = 'file'
}
}

//---Funcion editar cursos
/*----------comentario
function btnEditarTemarios(btn) {
    var datakey = $(btn).data("id");
    var p = $(btn).parent();
    $('#categoriaEditar').val(p.siblings('td')[0].innerHTML);
    $('#fechaEditar').val(p.siblings('td')[1].innerHTML);
    $('#horarioEditar').val(p.siblings('td')[2].innerHTML);
    $('#nombreEditar').val(p.siblings('td')[3].innerHTML);
    $('#duracionEditar').val(p.siblings('td')[4].innerHTML);
    $('#cupoEditar').val(p.siblings('td')[5].innerHTML);
    $('#observacionesEditar').val(p.siblings('td')[6].innerHTML);

    $('#modalEditarCursos').modal('show');
    $('button[id=btnActualizarCurso]').click(function (event) {
        firebase.database().ref("cursos/" + datakey).set({
            categoria: $('#categoriaEditar').val(),
            fecha: $('#fechaEditar').val(),
            horario: $('#horarioEditar').val(),
            nombre: $('#nombreEditar').val(),
            duracion: $('#duracionEditar').val(),
            cupo: $('#cupoEditar').val(),
            observaciones: $('#observacionesEditar').val()
        });
        //poner funcion de limpiar pendiente
        $('#modalEditarCursos').modal('hide');
    });
};

-----------*/

