modules.define('catalog2', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

  var swiper_cat = new Swiper('.catalog2__carusel', {
          slidesPerView: 4,
          slidesPerColumn: 2,
          spaceBetween: 10,
          pagination: {
            el: '.catalog2__swiper-pagination',
            clickable: true
          },
          breakpoints: {
            1170: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            880: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            415: {
              slidesPerView: 1,
              spaceBetween: 10,
            }
          }
        });

  provide(this);

});
