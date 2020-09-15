modules.define('form', ['i-bem-dom', 'jquery', 'mask'], function(provide, bemDom, $, mask) {
  /*// jQuery = $;

  $(function() {

    // $('#f_phone').mask('9 (999) 999-99-99');

    /*$('#form_order_btn_send', document).on('click', function(){

      var data = {};
      $('#form_order', document).find('input, textarea, select').each(function() {
        // добавим новое свойство к объекту $data
        // имя свойства – значение атрибута name элемента
        // значение свойства – значение свойство value элемента
        data[this.name] = $(this).val();
      });

      $.ajax({
        url: '/send-order/',
        type: 'post',
        data: data,
        success: function(result) {
          console.log(result)
          window.location = "/tnx-order/"
        }
      });

      // $('form[name=form_order]', document).submit();

    })

  })//*/

  provide(this);

});
