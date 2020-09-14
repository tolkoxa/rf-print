modules.define('advantages', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

  //разрешаем только на pc
  if (window.matchMedia('(max-width: 640px)').matches === false) {
      $(".advantages__item").mouseenter( function(e){
         $( this ).animate({'margin-top': '-10px'}, 200)
      } ).mouseleave(  function(e){
         $( this ).animate({'margin-top': '0px'}, 200)
      } );
  }

  provide( this );

});
