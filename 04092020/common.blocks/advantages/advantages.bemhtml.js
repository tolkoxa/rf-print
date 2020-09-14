block('advantages').content()(function() {
  return [{
    elem: 'wrapp',

    content:[
      {
          block: 'title',
          tag: 'h2',
          mods: { 'text-align': 'center' },
          content: 'Наши преимущества'
      },
      {
        elem: 'content',
        content:[
          { elem: 'item', content: [
              { block: 'text', content: '500', mods: { color: 'blue', size: '4xl', mrgn: 'top-50', text: 'bold' } },
              { block: 'text', content: 'Заказов в год!' }
            ]
          },
          { elem: 'item', content: [
              { block: 'text', content: '5', mods: { color: 'blue', size: '4xl', mrgn: 'top-50', text: 'bold' }  },
              { block: 'text', content: 'Лет изготовления текстильной продукции' }
            ]
          },
          { elem: 'item', content: [
              { block: 'text', content: '10 000', mods: { color: 'blue', size: '4xl', mrgn: 'top-50', text: 'bold' } },
              { block: 'text', content: 'Изготовленных за сутки до нового года по просьбе клиента футболок с нанесением 3х цветов' }
            ]
          }
        ]
      }
    ]

  }]
})
