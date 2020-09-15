block('form')(
  tag()('form'),
  addAttrs()(
    {
      name:'form_order',
      id:'form_order',
      action: '#fogm-go',
      enctype: 'multipart/form-data',
      method: 'post'
    }
  ),
  content()(function() {
    return [{
      elem: 'wrapp',
      content: [
        { elem: 'relContainer',
          content: [
            { tag: 'label',
              attrs: { for: 'typeprint' },
              content: [
              { block: 'text', mods: { size: 'xxl', color: 'gray' }, content: ['Тип печати', { block: 'req', tag: 'span', content: '*'}] },
              { block: 'dropdown',
                mods: { switcher: 'button', theme: 'islands', size: 's' },
                switcher: {
                  block: 'button',
                  mods: { togglable: 'check', clear: true },
                  text: { block: 'icon', mods: { size: 'q', glyph: 'question-circle', color:'gray', 'margin-svg':'off' } }
                },
                popup: ' Вид нанесения на материал '
              }]
            },
            { block: 'selected',
              mods: {
                   mode: 'radio',
                   theme: 'rfprint',
                   size: 'm'
               },
              tag: 'select',
              attrs: { name: 'typeprint' },
              content: [
                { tag: 'option', attrs: { value: 'Шелкография' }, content: 'Шелкография' },
                { tag: 'option', attrs: { value: 'Трафаретная' }, content: 'Трафаретная печать' }
              ]
            }
          ]
        },
        { elem: 'relContainer',
          content: [{
            tag: 'input',
            attrs: { type: 'file', name: 'file_image' }
          }]
        },
        { elem: 'relContainer',
          content: [
            {
              tag: 'label',
              attrs: {
                for: 'typeizdelia'
              },
              content: [
                { block: 'text', mods: { size: 'xxl', color: 'gray' }, content: ['Тип Изделия', { block: 'req', tag: 'span', content: '*'}] },
                { block: 'dropdown', mods: { switcher: 'button', theme: 'islands', size: 'm' },
                  switcher: {
                    block: 'button',
                    mods: { togglable: 'check', clear: true },
                    text: { block: 'icon', mods: { size: 'q', glyph: 'question-circle', color:'gray', 'margin-svg':'off' } }
                  },
                  popup: ' Важно знать материал на котором будет печать, для точного определения наилучшего типа печати '
                }]
            },
            {
              block: 'selected',
              mods: {
                   mode: 'radio',
                   theme: 'rfprint',
                   size: 'm'
               },
              tag: 'select',
              attrs: { name: 'typeizdelia' },
              content: [
                { tag: 'option', attrs: { value: 'Хлопчатые' }, content: 'Хлопчатые' },
                { tag: 'option', attrs: { value: 'Кожанные' }, content: 'Кожанные' }
              ]
            }
          ]
        },
        { elem: 'relContainer',
          content: [
            { tag: 'label',
              attrs: { for: 'typeprint' },
              content: { block: 'text', mods: { size: 'xxl', color: 'gray' }, content: ['Контакты', { block: 'req', tag: 'span', content: '*'}] },
            },
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: 'Ваше имя',
              name: 'name',
              val: '',
            },
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: '+7 (___) ___ __ __*',
              name: 'phone',
              val: '',
            },
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: 'Ваш E-mail',
              name: 'email',
              val: '',
            }]
        },
        { elem: 'relContainer',
          content: [{
            block: 'textarea',
            tag: 'textarea',
            mods: {
                theme: 'rfprint',
                size: 'm'
            },
            placeholder: 'Комментарии к заказу',
            name: 'message',
            val: '',
            // attrs: { name: 'message', placeholder: 'Комментарии к заказу' }
          }]
        },
        { elem: 'buttons',
          content:[
            {
              block: 'checkbox',
              mods: {
                  theme: 'islands',
                  size: 'm',
                  checked: true
              },
              attrs: {id: 'agree' },
              name: 'agree',
              val: 'agree',
              text: 'Я согласен на обработку данных'
            },
            {
              block: 'button',
              mods: { position: 'middle', theme: 'rfprint', order: 'blue'},
              id: 'form_order_btn_send',
              content: [{
                  block: 'text',
                  mods: { color: 'white', padding: 'right'},
                  tag: 'span',
                  content: { block: 'text', mods: { size: 'xl', text: 'bold' }, content: 'Отправить' }
              }]
            }
          ]
        }
      ]
    }]
  })
);
