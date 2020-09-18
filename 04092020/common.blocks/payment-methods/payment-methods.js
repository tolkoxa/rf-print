modules.define('payment-methods', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

  var swiper = new Swiper('.payment-methods__swiper', {
        slidesPerView: 4,
        slidesPerColumn: 2,
        spaceBetween: 10,
        pagination: {
          el: '.payment-methods__swiper-pagination',
          clickable: true,
          type: 'progressbar'
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          922: {
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

  provide( this );

});
