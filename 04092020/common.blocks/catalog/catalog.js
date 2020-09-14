modules.define('catalog', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

  //определяем jQuery для pushy
  jQuery = $;

  /* borschik:include:../../node_modules/owl.carousel/dist/owl.carousel.min.js */

  $(document).ready(function () {
      $("#owl-catalog").owlCarousel({
          navigation: true,
          pagination: true,
          autoWidth:true,
          loop:true,
          margin:10,
          // nav:true,
          responsive:{
              0:{
                  items:1
              },
              640:{
                  items:3
              },
              1000:{
                  items:4
              }
          }
      });
  });

  provide(this);

});
