module.exports = {
    block: 'page',
    title: 'UI kit',
    favicon: '/favicon.ico',

    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'ui.min.css' }
    ],
    scripts: [
      { elem: 'js', url: 'ui.min.js' },
      { elem: 'js', url: 'https://code.jquery.com/jquery-3.4.1.min.js' },
      { elem: 'js', url: '../../libs/action.js' }
    ],

    content: [
      { block: 'sidebar'},
      { block: 'pushy', mix: { block: 'pushy-right' } },
      { block: 'site-overlay', content: '' },
      { block: 'container',
        attrs: { id: 'container' },
        content: [
        {
          block: 'link',
          mix: { block: 'pushy-link' },
          url: '#',
          content:
            {
              block: 'icon',
              mods: { glyph: 'navicon', size: 's'}
            }
        },
        { block: 'p', content: [{ block: 'sidebar'}, { block: 'p', content:'Тестовое наполнение!'}] },
        {
          block: 'row',
          mods: { vam: 's' },
          content:[
            { elem: 'col',
              elemMods: { sw: 8, s: true },
              content :'hello'
            }
          ]
        }, 
        { block: 'form' },
        { block: 'sidebar'},
        { tag: 'hr' },
        { block: 'tabs'},
        { tag: 'hr' },
        { block: 'form-call-order' },
        { tag: 'hr' },

        { block: 'table',
          tag: 'table',
          content: [
            { tag: 'tr',
              content: [
              { tag: 'th',
                content: 'Заголовок 1'
              },
              { tag: 'th',
                content: 'Заголовок 1'
              }
              ]
            },
            { tag: 'tr',
              content: [
              { tag: 'td',
                content: 'Содержание 1'
              },
              { tag: 'td',
                content: 'Содержание 2'
              }
              ]
            }
          ]
        }
      //   {
      //     tag: 'form',
      //     attrs: {
      //       name: 'testForm',
      //       id: 'testForm',
      //       action: '#fogm-go',
      //       enctype: 'multipart/form-data',
      //       method: 'post'
      //       },
      //       content:{
      //         tag: 'fieldset',
      //         content:[
      //         {
      //           block: 'form-group',
      //           content:[
      //           { block: 'col-md-4 control-label',
      //             tag: 'label',
      //             attrs: { for: 'count' },
      //           },
      //           { block: 'col-md-6',
      //             content:{
      //               tag: 'input',
      //               attrs: { type: 'text', id: 'count' , name: 'imya', value: 'Hello Anton', placeholder: 'Ваше имя' },
      //             }
      //           }
      //         // { tag: 'label',
      //         //   attrs: { for: 'typeprint' },
      //         //   content: { block: 'text', mods: { size: 'xxl', color: 'gray' }, content: ['Контакты', { block: 'req', tag: 'span', content: '*'}] },
      //         // },
      //         // { tag: 'input',
      //         //   attrs: { name: 'name', value: 'Hello Anton', placeholder: 'Ваше имя' },
      //         // }
      //       ]
      //     }]
      //       }
      // }
    ]}
  ]}
