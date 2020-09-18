modules.define('printing-examples', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

  $(document).ready(function () {

    var swiper = new window.Swiper('.printing-examples__carusel', {
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        el: '.printing-examples__swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        }
      }
    });

    //разрешаем только на pc
    if (window.matchMedia('(max-width: 640px)').matches === false) {
        $(".swiper-slide", '.printing-examples__wrapp').mouseenter( function(e){
           $( this ).animate({'margin-top': '-10px'}, 200)
        } ).mouseleave(  function(e){
           $( this ).animate({'margin-top': '0px'}, 200)
        } );
    }

  });

  provide( this );

});
