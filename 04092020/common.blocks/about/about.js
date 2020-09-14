modules.define('about', ['i-bem-dom', 'modal', 'button'], function (provide, bemDom, Modal, Button) {

  provide(bemDom.declBlock(this.name,
    {
      onSetMod: {
        'js': {
          'inited': function () {
            this._modal = this.findChildBlock(Modal);
            console.log(this._modal);
          }
        }
      },
      _showModla: function () {
        this._modal.setMod('visible');
      }
    },
    {
      lazyInit: true,
      onInit: function () {
        this._events(Button).on('click', this.prototype._showModla);
      }
    })
  );
});
