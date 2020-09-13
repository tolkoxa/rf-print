module.exports = {
    block: 'page',
    title: 'Title usluga',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css' },
        { elem: 'css', url: '../../libs/jquery-ui.min.css' },
        { elem: 'css', url: 'usluga.min.css' }
    ],
    scripts: [
      { elem: 'js', url: 'usluga.min.js' },
      { elem: 'js', url: '../../libs/jquery-3.4.1.min.js' },
      { elem: 'js', url: '../../libs/jquery-ui.min.js' },
      { elem: 'js', url: '../../libs/action.js' }
    ],
    mods: { theme: 'rfprint' },
    content: [
        { block: 'header' },
        { block: 'menu-top', mix: { block: 'page_hide_mob' }},
        { block: 'pushy', mix: { block: 'pushy-right' }},
        { block: 'site-overlay', content: '' },
        {
          block: 'row',
          mods: { vam: 's' },
          content:[
            { elem: 'col',
              elemMods: { sw: 8, s: true },
              content: [
                { block: 'order-block' },
                { block: 'tabs',
                  attrs: { id: 'tabs' },
                  content:[
                    { block: 'ul', tag:'ul', content: [
                      { elem: 'li', tag: 'li', mix: { block: 'text', mods: { margin: '10px', 'mob-width': '100' } }, content: 'Примеры заказов:' },
                      { elem: 'li', tag: 'li', content: { html:'<a href="#tabs-1">Футболки</a>' }},
                      { elem: 'li', tag: 'li', content: { html:'<a href="#tabs-2">Свитшоты</a>' }},
                      { elem: 'li', tag: 'li', content: { html:'<a href="#tabs-3">Толстовки</a>' }},
                      { elem: 'li', tag: 'li', content: { html:'<a href="#tabs-4">Поло</a>' }}
                      ]
                    },
                    { block: 'tabs-1', attrs: { id: 'tabs-1' }, content: { html:'<p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>' }
                    },
                    { block: 'tabs-3', attrs: { id: 'tabs-2' }, content: { html:'<p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>' }
                    },
                    { block: 'tabs-2', attrs: { id: 'tabs-3' }, content: { html:'<p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p><p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>' }
                    },
                    { block: 'tabs-4', attrs: { id: 'tabs-4' }, content: { html:'<p>Примеры заказов </p>' }
                    },
                  ]
                }
              ]
            }
          ]
        },
        {
          block: 'row',
          mods: { vam: 's' },
          content:[
            { elem: 'col',
              elemMods: { sw: 8, s: true },
              content:
              { block: 'how-working', content: '' }
            }
          ]
        },
        // {
        //   block: 'row',
        //   mods: { vam: 's' },
        //   content:[
        //     { elem: 'col',
        //       elemMods: { sw: 8, s: true },
        //       content:
        //       { block: 'calculator', content: '' }
        //     }
        //   ]
        // },
        {
          block: 'row',
          mods: { vam: 's' },
          content:[
            { elem: 'col',
              elemMods: { sw: 8, s: true },
              content:
              { block: 'work-examples', content: '' }
            }
          ]
        },
        {
          block: 'row',
          mods: { vam: 's' },
          content:[
            { elem: 'col',
              elemMods: { sw: 8, s: true },
              content:
              { block: 'printing-examples', content: '' }
            }
          ]
        },
        { block: 'footer' }
    ]
};
