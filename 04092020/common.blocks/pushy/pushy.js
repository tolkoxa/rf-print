modules.define('pushy', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {
  //определяем jQuery для pushy
  jQuery = $;

  /* borschik:include:../../node_modules/@cmyee/pushy/js/pushy.js */

  provide( this );

});
