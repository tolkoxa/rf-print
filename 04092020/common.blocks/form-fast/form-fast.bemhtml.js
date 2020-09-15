block('form-fast')(
  tag()('form'),
  addAttrs()(
    {
      name: 'form-fast',
      id: 'form-fast',
      action: '/form-fast/',
      enctype: 'multipart/form-data',
      method: 'post'
    }
  ),
  content()(function() {

  return [
    {
      elem: 'wrapp',
      content: [
        { block: 'title',
          mods: { color: 'white', h3: true },
          mix: {block: 'text', mods: { align: 'center' }},
          content: 'Не нашли что искали?'
        },
        { block: 'text',
          mods: { color: 'white', align: 'center' },
          content: 'Задайте вопрос, и мы ответим в ближайшее время!'
        },
        { elem: 'content',
          content: [
          { elem: 'section1', content: [
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: 'Имя *',
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
              placeholder: 'E-mail *',
              name: 'email',
              val: '',
            }
          ] },
          { elem: 'section2' , content: [
            {
              block: 'textarea',
              tag: 'textarea',
              mods: {
                  theme: 'rfprint',
                  size: 'm',
                  'form-fast-textarea': true
              },
              placeholder: 'Напишите, что вы искали?',
              name: 'message',
              val: '',
            }
          ]},
          { elem: 'section3' , content: [
            {
              block: 'button',
              mods: { position: 'middle', theme: 'rfprint', 'fast-form': 'blue'},
              id: 'form-fast-btn-send',
              content: [{
                  block: 'text',
                  mods: { color: 'white', padding: 'right', size: 'xl', weight: 300},
                  tag: 'span',
                  content: 'Отправить'
              }]
            },
            { block: 'text',
              mods: { color: 'white', weight: 300, size: 'm' },
              content: { html: 'Нажимая кнопку &laquo;Отправить&raquo;, Вы автоматически принимаете условия Пользовательского соглашения' }
            }
          ] }
          ]
        }
      ]
    }
  ]
}))
