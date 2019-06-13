var refAdmin = firebase.database().ref("admin");
/*----------Redimencionar ventanas-----------*/
$('a[id=anchar]').click(function (event) {
    event.preventDefault();
    var divRedimencionar = $(this).parents('li').parents('ul').parents('div').parents('div').parents('div').parents('div');
    var clase = divRedimencionar.attr("class");
    if (clase == "col-md-6") {
        var ventana = divRedimencionar.attr("id");
        var refVentana = refAdmin.child(ventana);
        refVentana.set("col-md-12");
    } else {
        if (clase == "col-md-12") {
            var ventana = divRedimencionar.attr("id");
            var refVentana = refAdmin.child(ventana);
            refVentana.set("col-md-6");
        }
    }
});
var ventana1 = refAdmin.child("ventana1");
var ventana2 = refAdmin.child("ventana2");
var ventana3 = refAdmin.child("ventana3");
var ventana4 = refAdmin.child("ventana4");
var ventana5 = refAdmin.child("ventana5");
ventana1.on('value', function (snapshot) {
    $('#ventana1').removeAttr("class");
    $('#ventana1').attr("class", snapshot.val());
});
ventana2.on('value', function (snapshot) {
    $('#ventana2').removeAttr("class");
    $('#ventana2').attr("class", snapshot.val());
});
ventana3.on('value', function (snapshot) {
    $('#ventana3').removeAttr("class");
    $('#ventana3').attr("class", snapshot.val());
});
ventana4.on('value', function (snapshot) {
    $('#ventana4').removeAttr("class");
    $('#ventana4').attr("class", snapshot.val());
});
ventana5.on('value', function (snapshot) {
    $('#ventana5').removeAttr("class");
    $('#ventana5').attr("class", snapshot.val());
});
var logo = refAdmin.child("logo");
/*-----Evento child_added Detecta y Agrega nuevos datos---------*/
mostrarLogo();
function mostrarLogo() {
    logo.on('value', function (snapshot) {
        //añadir elementos
        $('#adminLogo').html('');
        var nombre = snapshot.child("nombre").val();
        $('#adminLogo').html('<i onClick="editarLogo()" class="icon-edit"></i>');
        var src = snapshot.child("src").val();
        $('#adminLogo').removeData("nom");
        $('#adminLogo').attr("data-nom", nombre);
        var img = document.createElement("img");
        img.setAttribute("id", "imagenLogotipo");
        img.setAttribute("src", src);
        img.setAttribute("alt", nombre);
        img.setAttribute("class", "img-fluid");
        document.getElementById('adminLogo').appendChild(img);
    });
}
function editarLogo() {
    $('#adminLogo').html('<label for="fileLogo" class="btnfiles">Seleciona una Imagen</label><input onchange="nombreImagen(this)" type="file" accept="image/*" id="fileLogo" style="display: none;"><i onClick="cancelarLogo()" class="icon-close"></i><i onClick="guardarLogo()" class="icon-checkmark">');
};
function nombreImagen(event){
  var nombre=$(event).context.files[0].name;
  var escribir=$(event).siblings("label");
    escribir.text(nombre);
};
function cancelarLogo() {
    mostrarLogo();
}
function guardarLogo() {
    //var eliminar=$(element).data("eliminar");
    var file = document.getElementById('fileLogo').files[0];
    if (file) {
        var eliminar = $('#adminLogo').data("nom");
        var nombre = file.name;
        if (nombre != eliminar) {
            var imgRef = firebase.storage().ref().child('img/logo/' + eliminar);
            imgRef.delete().then(function () {
                var storageRef = firebase.storage().ref().child('img/logo/' + nombre);
                var uploadTask = storageRef.put(file);
                uploadTask.on('state_changed', null, function (error) {
                    console.log('upload error', error);
                }, function () {
                    // console.log(uploadTask.snapshot);
                    var imageData = {
                        url: uploadTask.snapshot.downloadURL,
                        peso: uploadTask.snapshot.totalBytes,
                        nombre: uploadTask.snapshot.metadata.name,
                        path: uploadTask.snapshot.metadata.fullPath
                    }
                    var refAdmin = firebase.database().ref("admin");
                    var logo = refAdmin.child("logo");
                    refAdmin.child('mapa1/url').set(imageData.url);
                    refAdmin.child('mapa2/url').set(imageData.url);
                    logo.set({
                        src: imageData.url,
                        nombre: imageData.nombre
                    });
                });
                $('#fileLogo').val("");
            }).catch(function (error) {
                alert("Error no se pudo sustituir la imagen");
            });
        } else {
            alert("la imagen es la misma seleciona otra");
        }
    } else {
        alert("Selecciona Una imagen");
    }
};
/*----------Editar el menú y logo de la pagina principal-----------*/
var texto1 = refAdmin.child("texto1");
var texto2 = refAdmin.child("texto2");
var texto3 = refAdmin.child("texto3");
var texto4 = refAdmin.child("texto4");
var texto5 = refAdmin.child("texto5");
/*-----Evento child_added Detecta y Agrega nuevos datos---------*/
texto1.on('value', function (snapshot) {
    //añadir elementos
    var texto = snapshot.val();
    $('#texto1').html('');
    $('#texto1').html('<i onClick="editarInicio(this)" class="icon-edit"></i>' + texto);
});
texto2.on('value', function (snapshot) {
    //añadir elementos
    var texto = snapshot.val();
    $('#texto2').html('');
    $('#texto2').html('<i onClick="editarInicio(this)" class="icon-edit"></i>' + texto);
});
texto3.on('value', function (snapshot) {
    //añadir elementos
    var texto = snapshot.val();
    $('#texto3').html('');
    $('#texto3').html('<i onClick="editarInicio(this)" class="icon-edit"></i>' + texto);
});
texto4.on('value', function (snapshot) {
    //añadir elementos
    var texto = snapshot.val();
    $('#texto4').html('');
    $('#texto4').html('<i onClick="editarInicio(this)" class="icon-edit"></i>' + texto);
});
texto5.on('value', function (snapshot) {
    //añadir elementos
    var texto = snapshot.val();
    $('#texto5').html('');
    $('#texto5').html('<i onClick="editarInicio(this)" class="icon-edit"></i>' + texto);
});
function editarInicio(element) {
    var p = $(element).parents('p');
    var texto = p.text();
    $(p).html('<input type="text" id="textGuardar" value="' + texto + '"><i onClick="cancelarEdicion(this)" data-texto="' + texto + '" class="icon-close"></i><i onClick="guardarEdicion(this)" class="icon-checkmark">');
}
function cancelarEdicion(element) {
    var p = $(element).parents('p');
    var res = $(element).data("texto");
    $(p).html('<i onClick="editarInicio(this)" class="icon-edit"></i>' + res);
};
function guardarEdicion(element) {
    var input = $(element).siblings('input');
    var p = $(element).parents('p');
    var refTexto = p.data("posi");
    refAdmin.child(refTexto).set(input.val());
}
/*----------Editar fondos de la pagina principal el banner-----------*/
var fondo1 = refAdmin.child("fondo1");
var fondo2 = refAdmin.child("fondo2");
var fondo3 = refAdmin.child("fondo3");
fondo1.on('value', function (snapshot) {
    //añadir elementos
    var imgSrc = snapshot.child('src').val();
    var imgNombre = snapshot.child('nombre').val();
    var eslogan1 = snapshot.child('eslogan1').val();
    var eslogan2 = snapshot.child('eslogan2').val();
    $('#fondo1').removeData("nom");
    $('#fondo1').attr("data-nom", imgNombre);
    $('#fondo1').html('<p>Primer Eslogan</p><div class="dropdown-divider"></div><h1 class="eslogan" data-eslogan="eslogan1"><i onClick="editarEslogan(this)" class="icon-edit"></i>' + eslogan1 + '</h1><p>Segundo Eslogan</p><div class="dropdown-divider"></div><h1 class="eslogan" data-eslogan="eslogan2"><i onClick="editarEslogan(this)" class="icon-edit"></i>' + eslogan2 + '</h1><p>Imagen de Fondo</p><div class="dropdown-divider"></div><label for="fileimg1" class="btnfiles">Seleciona una Imagen</label><input onchange="nombreImagen(this)" style="display:none;" type="file" accept="image/*" id="fileimg1"><i onClick="guardarimg(this)" class="icon-checkmark"><img src="' + imgSrc + '" alt="" class="img-fluid">');
});
fondo2.on('value', function (snapshot) {
    //añadir elementos
    var imgSrc = snapshot.child('src').val();
    var imgNombre = snapshot.child('nombre').val();
    var eslogan1 = snapshot.child('eslogan1').val();
    var eslogan2 = snapshot.child('eslogan2').val();
    $('#fondo2').removeData("nom");
    $('#fondo2').attr("data-nom", imgNombre);
    $('#fondo2').html('<p>Primer Eslogan</p><div class="dropdown-divider"></div><h1 class="eslogan" data-eslogan="eslogan1"><i onClick="editarEslogan(this)" class="icon-edit"></i>' + eslogan1 + '</h1><p>Segundo Eslogan</p><div class="dropdown-divider"></div><h1 class="eslogan" data-eslogan="eslogan2"><i onClick="editarEslogan(this)" class="icon-edit"></i>' + eslogan2 + '</h1><p>Imagen de Fondo</p><div class="dropdown-divider"></div><label for="fileimg2" class="btnfiles">Seleciona una Imagen</label><input onchange="nombreImagen(this)" style="display:none;" type="file" accept="image/*" id="fileimg2"><i onClick="guardarimg(this)" class="icon-checkmark"><img src="' + imgSrc + '" alt="" class="img-fluid">');
});
fondo3.on('value', function (snapshot) {
    //añadir elementos
    var imgSrc = snapshot.child('src').val();
    var imgNombre = snapshot.child('nombre').val();
    var eslogan1 = snapshot.child('eslogan1').val();
    var eslogan2 = snapshot.child('eslogan2').val();
    $('#fondo3').removeData("nom");
    $('#fondo3').attr("data-nom", imgNombre);
    $('#fondo3').html('<p>Primer Eslogan</p><div class="dropdown-divider"></div><h1 class="eslogan" data-eslogan="eslogan1"><i onClick="editarEslogan(this)" class="icon-edit"></i>' + eslogan1 + '</h1><p>Segundo Eslogan</p><div class="dropdown-divider"></div><h1 class="eslogan" data-eslogan="eslogan2"><i onClick="editarEslogan(this)" class="icon-edit"></i>' + eslogan2 + '</h1><p>Imagen de Fondo</p><div class="dropdown-divider"></div><label for="fileimg3" class="btnfiles">Seleciona una Imagen</label><input onchange="nombreImagen(this)" style="display:none;" type="file" accept="image/*" id="fileimg3"><i onClick="guardarimg(this)" class="icon-checkmark"><img src="' + imgSrc + '" alt="" class="img-fluid">');
});

function editarEslogan(element) {
    var h1 = $(element).parents('h1');
    var texto = h1.text();
    $(h1).removeData("texto");
    $(h1).attr("data-texto", texto);
    $(h1).html('<textarea id="texareaGuardar" rows="5" class="form-control square">' + texto + '</textarea><i onClick="cancelarEdicionEslogan(this)" data-texto="' + texto + '" class="icon-close"></i><i onClick="guardarEdicionEslogan(this)" class="icon-checkmark">');
}

function cancelarEdicionEslogan(element) {
    var h1 = $(element).parents('h1');
    var texto = h1.data("texto");
    h1.html('<i onClick="editarEslogan(this)" class="icon-edit"></i>' + texto);
}

function guardarEdicionEslogan(element) {
    var h1 = $(element).parents('h1');
    var eslogan = h1.data("eslogan");
    var fondo = h1.parents('div').data("fondo");
    var textarea = $(element).siblings('textarea');
    var refFondo = refAdmin.child(fondo);
    var refGuardar = refFondo.child(eslogan);
    refGuardar.set(textarea.val());
}

function guardarimg(element) {
    var input = $(element).siblings('input');
    var fondo = $(element).parents('div');
    var idFondo = $(fondo).data("fondo");
    var idImg = $(input).attr("id");
    //(this).closest("tr").find('.file_penal')[0]
    var imagen = document.getElementById(idImg).files[0];
    if (imagen) {
        var eliminarF = $(element).parents('div').data("nom");
        var nombreF = imagen.name;

        if (nombreF != eliminarF) {
            var imgRefFondo = firebase.storage().ref().child('img/' + idFondo + '/' + eliminarF);
            imgRefFondo.delete().then(function () {
                var refFondo = firebase.storage().ref().child('img/' + idFondo + '/' + nombreF);
                var uploadTaskFondo = refFondo.put(imagen);
                uploadTaskFondo.on('state_changed', null, function (error) {
                    console.log('upload error', error);
                }, function () {
                    // console.log(uploadTask.snapshot);
                    var imageFondos = {
                        url: uploadTaskFondo.snapshot.downloadURL,
                        peso: uploadTaskFondo.snapshot.totalBytes,
                        nombre: uploadTaskFondo.snapshot.metadata.name,
                        path: uploadTaskFondo.snapshot.metadata.fullPath
                    }
                    var refFondos = firebase.database().ref('admin/' + idFondo);
                    refFondos.child("src").set(imageFondos.url);
                    refFondos.child("nombre").set(imageFondos.nombre);
                });
            }).catch(function (error) {
                alert("Error no se pudo sustituir la imagen");
            });
        } else {
            alert("la imagen es la misma seleciona otra");
        }
    } else {
        alert("Selecciona Una imagen");
    }
}
/*----------Mostrar titulos de los contenidos-----------*/
var btnTitulo = refAdmin.child("contenido1").child('texto1');
btnTitulo.on('value', function (snapshot) {
    $('#tituloContenido1').text(snapshot.val());
});
/*----------Editar contenido -----------*/
var contenido1 = refAdmin.child("contenido1");
contenido1.on('value', function (snapshot) {
    //añadir elementos
    var titulo = snapshot.child('texto1').val();
    var texto = snapshot.child('texto2').val();
    $('#textoContenido1').html('<p>Titulo</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="texto1"><i onClick="editarContenido(this)" class="icon-edit"></i>' + titulo + '</h2><p>Contenido</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="texto2"><i onClick="editarContenido(this)" class="icon-edit"></i>' + texto + '</h2>');
});

function editarContenido(element) {
    var h2 = $(element).parents('h2');
    var texto = h2.text();
    $(h2).removeData("texto");
    $(h2).attr("data-texto", texto);
    $(h2).html('<textarea id="texareaGuardar" rows="6" class="form-control square">' + texto + '</textarea><i onClick="cancelarEdicionContenido(this)" data-texto="' + texto + '" class="icon-close"></i><i onClick="guardarEdicionContenido(this)" class="icon-checkmark">');
}

function cancelarEdicionContenido(element) {
    var h2 = $(element).parents('h2');
    var texto = h2.data("texto");
    h2.html('<i onClick="editarContenido(this)" class="icon-edit"></i>' + texto);
}

function guardarEdicionContenido(element) {
    var h2 = $(element).parents('h2');
    var refTexto = h2.data("contenido");
    var contenido = h2.parents('div').data("contenido");
    var textarea = $(element).siblings('textarea');
    var refContenido = refAdmin.child(contenido);
    var refGuardar = refContenido.child(refTexto);
    refGuardar.set(textarea.val());
}
/*----------Mostrar titulos de las listas-----------*/

var btnLista = refAdmin.child("lista1").child('titulo');
btnLista.on('value', function (snapshot) {
    $('#tituloLista1').text(snapshot.val());
});
var btnLista = refAdmin.child("lista2").child('titulo');
btnLista.on('value', function (snapshot) {
    $('#tituloLista2').text(snapshot.val());
});

/*----------Editar contenido-----------*/
var lista1Titulo = refAdmin.child("lista1").child('titulo');
var lista2Titulo = refAdmin.child("lista2").child('titulo');

var lista1Listado = refAdmin.child("lista1").child('listado');
var lista2Listado = refAdmin.child("lista2").child('listado');
//var contenido1=refAdmin.child("contenido1");
lista1Titulo.on('value', function (snapshot) {
    //añadir elementos
    var titulo = snapshot.val();
    $('#titulo1').html('<div data-listado="titulo"><div><h2 class="eslogan"><i onClick="editarLista(this)" class="icon-edit"></i>' + titulo + '</h2></div></div>');
});
lista2Titulo.on('value', function (snapshot) {
    //añadir elementos
     var titulo = snapshot.val();
    $('#titulo2').html('<div data-listado="titulo"><div><h2 class="eslogan"><i onClick="editarLista(this)" class="icon-edit"></i>' + titulo + '</h2></div></div>');
});

lista1Listado.on('child_added', function (snapshot) {
    //añadir elementos
    var data = snapshot.val();
    var creadoLi = document.createElement("div");
    var idLi = snapshot.key;
    creadoLi.setAttribute("id", idLi);
    creadoLi.setAttribute("class", "eslogan media");
    creadoLi.setAttribute("data-listado", "listado");
    creadoLi.innerHTML = crearHtmlListado(data);
    document.getElementById('listado1').appendChild(creadoLi);
});
lista1Listado.on("child_changed", function (snapshot) {
    var elementActualizar = document.getElementById(snapshot.key);
    var data = snapshot.val();
    $('#' + snapshot.key).html('<div class="media-body"><h2><i onClick="editarLista(this)" class="icon-edit"></i>' + data.texto + '</h2></div><div class="media-right"><i class="icon-trash4" onClick="eliminarListado(this)"></i></div>');
});
lista1Listado.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});
lista2Listado.on('child_added', function (snapshot) {
    //añadir elementos
   var data = snapshot.val();
    var creadoLi = document.createElement("div");
    var idLi = snapshot.key;
    creadoLi.setAttribute("id", idLi);
    creadoLi.setAttribute("class", "eslogan media");
    creadoLi.setAttribute("data-listado", "listado");
    creadoLi.innerHTML = crearHtmlListado(data);
    document.getElementById('listado2').appendChild(creadoLi);
});
lista2Listado.on("child_changed", function (snapshot) {
    var elementActualizar = document.getElementById(snapshot.key);
    var data = snapshot.val();
    $('#' + snapshot.key).html('<div class="media-body"><h2><i onClick="editarLista(this)" class="icon-edit"></i>' + data.texto + '</h2></div><div class="media-right"><i class="icon-trash4" onClick="eliminarListado(this)"></i></div>');
});
lista2Listado.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});

function crearHtmlListado(data) {
    var contenido = '<div class="media-body"><h2><i onClick="editarLista(this)" class="icon-edit"></i>' + data.texto + '</h2></div><div class="media-right"><i class="icon-trash4" onClick="eliminarListado(this)"></i></div>';
    return contenido;
}

function nuevoListado(element) {
    var h2 = $(element).parents('h2');
    var lista = h2.parents('div').data("lista");
    var nuevoListado = refAdmin.child(lista).child('listado');
    nuevoListado.push({
        texto: "Edita este texto"
    });
}

function eliminarListado(element) {
    var div1 = $(element).parents('div');
    var div2 = div1.parents('div');
    var lista = div2.parents('div').parents('div').data("lista");
    var eliminarListado = refAdmin.child(lista).child('listado');
    var datokey = $(div2).attr("id");
    eliminarListado.child(datokey).remove();
}
//----Detecta elementoas eliminados y refresca la vista

function editarLista(element) {
    var h2 = $(element).parents('h2');
    var texto = h2.text();
    $(h2).removeData("texto");
    $(h2).attr("data-texto", texto);
    $(h2).html('<textarea id="texareaGuardar" rows="3" class="form-control square">' + texto + '</textarea><i onClick="cancelarEdicionLista(this)" class="icon-close"></i><i onClick="guardarEdicionLista(this)" class="icon-checkmark">');
}

function cancelarEdicionLista(element) {
    var h2 = $(element).parents('h2');
     var div = h2.parents('div');
    var listado = div.parents('div').data("listado");
    var texto = h2.data("texto");
    if (listado == "titulo") {
        h2.html('<i onClick="editarLista(this)" class="icon-edit"></i>' + texto);
    } else {
        h2.html('<i onClick="editarLista(this)" class="icon-edit"></i>' + texto);
    }
}

function guardarEdicionLista(element) {
    var h2 = $(element).parents('h2');
    console.log(h2);
    var  div1= h2.parents('div');
    console.log(div1);
    var  div2= div1.parents('div');
     console.log(div2);
    var refListado = div2.data("listado");
     console.log(refListado);
    var lista = div2.parents('div').parents('div').data("lista");
     console.log(lista);
    var textarea = $(element).siblings('textarea');
     console.log(textarea);
    var refLista = refAdmin.child(lista);
     console.log(refLista);
    var refGuardar = refLista.child(refListado);
     console.log(refGuardar);
    if (refListado == "titulo") {
         console.log("entro para guardar titulo: "+refListado);
        refGuardar.set(textarea.val());
    } else {
         console.log(refListado);
        var id = div2.attr("id");
        refLista.child(refListado + '/' + id).set({
            texto: textarea.val()
        });
    }
}
/*----------Mapas-----------*/
var mapa1=refAdmin.child("mapa1");
var mapa2=refAdmin.child("mapa2");

var tituloMapa1 =mapa1.child('titulo');
tituloMapa1.on('value', function (snapshot) {
    $('#tituloMapa1').text(snapshot.val());
});
var tituloMapa2 =mapa2.child('titulo');
tituloMapa2.on('value', function (snapshot) {
    $('#tituloMapa2').text(snapshot.val());
});
/*----------Editar contenido -----------*/

mapa1.on('value', function (snapshot) {
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
    
    $('#contenidoMapa1').html('<p>Titulo</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="titulo"><i onClick="editarContenido(this)" class="icon-edit"></i>' + titulo + '</h2><p>Descripción</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="descripcion"><i onClick="editarContenido(this)" class="icon-edit"></i>' + descripcion + '</h2><p>Clave</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="clave"><i onClick="editarContenido(this)" class="icon-edit"></i>' + clave + '</h2><p>Dirección</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="direccion"><i onClick="editarContenido(this)" class="icon-edit"></i>' + direccion + '</h2><p>Correo</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="correo"><i onClick="editarContenido(this)" class="icon-edit"></i>' + correo + '</h2><p>Facebook</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="facebook"><i onClick="editarContenido(this)" class="icon-edit"></i>' + facebook + '</h2><p>Teléfono</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="telefono"><i onClick="editarContenido(this)" class="icon-edit"></i>' + telefono + '</h2><p>Ubicación</p><div class="dropdown-divider"></div><p>Latitud:</P><h2 class="eslogan" data-contenido="latitud"><i onClick="editarContenido(this)" class="icon-edit"></i>' + lati + '</h2><p>Longitud:</P><h2 class="eslogan" data-contenido="longitud"><i onClick="editarContenido(this)" class="icon-edit"></i>' + longi + '</h2>');
    var data={
        obtitulo:titulo,
        obdescripcion:descripcion,
        obdireccion:direccion,
        oblati:lati,
        oblongi:longi,
        oburl:url
    };
    initMap(data,"map1");
});
mapa2.on('value', function (snapshot) {
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
    
    $('#contenidoMapa2').html('<p>Titulo</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="titulo"><i onClick="editarContenido(this)" class="icon-edit"></i>' + titulo + '</h2><p>Descripción</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="descripcion"><i onClick="editarContenido(this)" class="icon-edit"></i>' + descripcion + '</h2><p>Clave</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="clave"><i onClick="editarContenido(this)" class="icon-edit"></i>' + clave + '</h2><p>Dirección</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="direccion"><i onClick="editarContenido(this)" class="icon-edit"></i>' + direccion + '</h2><p>Correo</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="correo"><i onClick="editarContenido(this)" class="icon-edit"></i>' + correo + '</h2><p>Facebook</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="facebook"><i onClick="editarContenido(this)" class="icon-edit"></i>' + facebook + '</h2><p>Teléfono</p><div class="dropdown-divider"></div><h2 class="eslogan" data-contenido="telefono"><i onClick="editarContenido(this)" class="icon-edit"></i>' + telefono + '</h2><p>Ubicación</p><div class="dropdown-divider"></div><p>Latitud:</P><h2 class="eslogan" data-contenido="latitud"><i onClick="editarContenido(this)" class="icon-edit"></i>' + lati + '</h2><p>Longitud:</P><h2 class="eslogan" data-contenido="longitud"><i onClick="editarContenido(this)" class="icon-edit"></i>' + longi + '</h2>');
    var data={
        obtitulo:titulo,
        obdescripcion:descripcion,
        obdireccion:direccion,
        oblati:lati,
        oblongi:longi,
        oburl:url
    };
    initMap(data,"map2");
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
	var contentString = '<div id="pincho" class="container"><div class="row justify-content-md-center"><div class="col col-6 imagenMapa"><img src="'+data.oburl+'" alt="IMCI JIUTEPEC" class="img-fluid"></div><div class="col-6 contenidoMapa"><h1>'+data.obtitulo+'</h1><p>'+data.obdescripcion+'</p><p>'+data.obdireccion+'</p><span data-lat="'+data.oblati+'" data-long="'+data.oblongi+'" onClick="direccion(this)" class="icon-mapa">Mapa de Google</span></div></div></div>';
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




