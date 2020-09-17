modules.define('menu-top', ['i-bem-dom', 'pushy', 'jquery'], function(provide, bemDom, pushy, $) {

  //Ниспадающее меню
  $(".ul__li_drop_down, .ul_drop_down", document).mouseenter( function(e){
     $( this ).find('.ul_drop_down').fadeIn( 200 );
  } ).mouseleave(  function(e){
     $( this ).find('.ul_drop_down').fadeOut( 200 );
  } );

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {
            }
        }
    }
}));

});
