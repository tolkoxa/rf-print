block('how-working').content()(function() {
  return [{
    elem: 'wrapp',

    content:[
      {
          block: 'title',
          tag: 'h2',
          attrs: { name: 'howworking'} ,
          mods: { 'text-align': 'center' },
          content:'Как мы работаем'
      },
      {
        elem: 'swiper',
        mix: [{ block: 'swiper-container' } ],
        content:[
            { block: 'swiper-wrapper',
              content:
              [
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'phone', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Звоните нам или пишите на Email' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'user', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Наш менеджер свяжется с Вами в течении 10—15 мин' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'commenting-o', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Озвучиваете интересующий Вас вопрос или задачу' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'info-circle', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Мы производим расчет по стоимости' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'file-text-o', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Затем оплачиваете заказ удобным способом и ожидаете поставку ' }
                    ]
                  }
                },
                { block: 'swiper-slide', content:
                  { elem: 'item', content: [
                      { block: 'icon', mods: { glyph: 'thumbs-o-up', color:'white', 'margin-svg':'off', 'blue-carton': true } },
                      { block: 'text', content: 'Далее мы запускаем заказ в производство по готовности доставляем его после утверждения финального образца' }
                    ]
                  }
                }

              ]
            },
            { elem: 'swiper-pagination', content: ''}
          ]
      }
    ]

  }]
})
