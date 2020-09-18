block('order-block').content()(function() {
  return [{
    elem: 'wrapp',
    content: [
      { elem: 'left',
        content:
        { block: 'image',
          url: '../../img/usluga.jpg',
          title: 'Заголовок карточки товара',
        }
      },
      { elem: 'right',
        content: [
          { block: 'title',
            mods:{ 'margin-off': true },
            tag: 'h1',
            content: 'Прямая печать'
          },
          { elem: 'examples-price',
            content: { html: ' Футболки от 170 р Толстовки от 900 р Свитшоты от 900 р'}
          },
          { elem: 'price-link',
            content:
            { block: 'link', url: '#', mods: { color: 'blue' }, content: 'Смотреть полный прайс' },
          },
          { elem: 'buttons',
            content: [
              { block: 'button', mods: { padding: 'order' }, id: 'btn-order', content: { block:'text', mods: { size: 'xxl', color: 'white' }, content:'Заказать' }},
              { block: 'button', mods: { padding: 'order' }, id: 'btn-calculator', content: { block:'text', mods: { size: 'xxl' }, content: 'Конструктор' }}
            ]
          },
          { block: 'text',
            mods: { border: 'dashed' },
            content: {
              html: '<p>Возможности производства: <span class="text_color_blue">1000</span> шт в день</p> <p>Загруженность производства: <span class="text_color_blue">50%</span></p>'
            }
          }
        ]
      }
    ]
  }]
})
