modules.define('how-working', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

    if (window.matchMedia('(max-width: 992px)').matches) {
        var how_working_swiper = new Swiper('.how-working__swiper', {
            slidesPerView: 4,
            spaceBetween: 10,
            pagination: {
                el: '.how-working__swiper-pagination',
                clickable: true,
                type: 'progressbar'
            },
            breakpoints: {
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
    }
    provide(this);

});
