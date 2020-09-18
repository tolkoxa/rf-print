modules.define('our-clients', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function() {

                }
            }
        },

    }));
});