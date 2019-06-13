jQuery(document).ready(function(){
   'use strict';
//-------Pegar menu index -----//
  var menu1 = $('#menuStike');
   var menu_offset1 = menu1.offset(); 
  $(window).on('scroll', function() {  
    if($(window).scrollTop() > menu_offset1.top) {
	  menu1.removeClass('menu');
      menu1.addClass('menu-fijo');
    } else {
      menu1.removeClass('menu-fijo');
      menu1.addClass('menu');
    }
  });
    
    $('a[class="nav-color"]').click(function(){
        var ancho = $(window).width();
        if(ancho<=974){
           $('#navbarSupportedContent').removeClass("show");
        }
     
        
    })
   

    
  });


