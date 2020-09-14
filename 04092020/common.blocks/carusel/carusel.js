modules.define('carusel', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

  $(document).ready(function () {

    //initialize swiper when document ready
    var mySwiper = new window.Swiper ('.carusel__swiper-container', {
      // Optional parameters
      // loop: true,
      effect: 'coverflow',
      grabCursor: false,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows : true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  });
  provide( this );

});
