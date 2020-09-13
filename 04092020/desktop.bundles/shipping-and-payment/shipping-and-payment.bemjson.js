module.exports = {
    block: 'page',
    title: 'shipping-and-payment',
    favicon: '/favicon.ico',

    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'shipping-and-payment.min.css' }
    ],
    scripts: [
      { elem: 'js', url: 'shipping-and-payment.min.js' },
      { elem: 'js', url: 'https://code.jquery.com/jquery-3.4.1.min.js' },
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
            content:
            { block: 'content',
              content: [
                { block: 'title', tag: 'h1', mods: { 'text-align': 'center'}, content: 'Доставка и Оплата' },
                { block: 'text', mods: { theme: 'snow'}, content:
                  [
                    { block: 'span', tag: 'span', mix: { block: 'text', mods: { text: 'bold' } },
                      content: {
                        html: 'Минимальная сумма заказа - <span class="text text_color_blue">4800</span> руб.'
                      }
                    },
                    { block: 'span', tag: 'span', mix: { block: 'text', mods: { border: 'dashed' } }, content: 'Обращаем ваше внимание, что цены на услуги указаны без НДС.' },
                    { block: 'text', tag:'p', content: 'Оплатить заказ можно разныами способами:'},
                    { block: 'ul',
                      tag: 'ul',
                      content: [
                        { tag:'li', content: { html: '<span class="text text_color_blue">наличными при получении</span> товара - при сумме заказа <span class="text text_color_blue">не более</span> <span class="text text_color_ ">5000</span> руб. (при заказах на большую сумму потребуется предоплата)'} },
                        { tag:'li', content: { html: 'по <span class="text text_color_blue">безналичному расчету</span> на расчетный счет компании (без НДС)'} },
                      ]
                    }
                  ]
                },
                { block: 'text', mods: { theme: 'snow'}, content:
                  [
                    { block: 'map', mods: { float: 'right' }, content: { html: '<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4560d21ee0cb02ad3e8d4e33245d4011121f45f7ab90eb9b4f96f423f72d4395&amp;width=100%25&amp;height=450&amp;lang=ru_RU&amp;scroll=true"></script>'} },
                    { block: 'span', tag: 'span', mix: [{ block: 'title', mods: { h4: true }}, { block: 'text', mods: { text: 'bold' } }],
                      content: {
                        html: 'Самовывоз'
                      }
                    },
                    { block: 'text', tag: 'p', content: { html: 'Вы можете забрать готовый заказ самостоятельно с <span class="text text_color_blue">9.00</span> до <span class="text text_color_blue">21.00</span> ежедневно по адресу: <br> <span class="text text_color_blue">Павелецкая набережная, д.2, стр.11</span> по предварительной договоренности с менеджером'}},
                    { block: 'text', tag: 'p', content: { html: 'Обращаем ваше внимание, что рабочее время бухгалтерии по будним дням с <span class="text text_color_blue">9.00</span> до <span class="text text_color_blue">18.00.</span>'}},
                    { block: 'text', tag: 'p', content: { html: 'Если вы забираете заказ, оплаченный по безналичному расчету, в вечернее время или в выходные дни, необходимо предупредить вашего менеджера заранее для подготовки отгрузочных документов.'}},
                    { block: 'text', tag: 'p',  mods: { border: 'dashed' }, content: { html: 'Просим вас уточнять готовность заказа у вашего менеджера <span class="text text_color_blue">по контактам</span>'}}
                  ]
                },
                { block: 'text', mods: { theme: 'snow', dostavka: true }, content:
                  [
                    { block: 'span', tag: 'span', mix: [{ block: 'title', mods: { h4: true }}, { block: 'text', mods: { text: 'bold' } }],
                      content: {
                        html: 'Получение товара'
                      }
                    },
                    { block: 'text', tag: 'p', content: { html: 'При получении заказа, оплаченному по безналичному расчету от юридического лица, <span class="text text_color_blue">обязательно наличие доверенности или печати.</span> (Доверенность предоставляется по форме М-2, которая утверждена Постановлением Госкомстата России от 30.10.97 № 71а).'}},
                    { block: 'text', tag: 'p', content: { html: 'Для физического лица достаточно <span class="text text_color_blue">наличия документа, удостоверяющего личность.</span>'}},
                    { block: 'text', tag: 'p', content: { html: 'При удаленных от метро доставках расчет идет по тарифу автомобильной доставки.'}},
                    { block: 'text', tag: 'p',  mods: { border: 'dashed' }, content: { html: 'Доставка осуществляется в будни с <span class="text text_color_blue">9.00</span> до <span class="text text_color_blue">18.00.</span> Иные условия доставки обсуждаются дополнительно, при необходимости.'}},
                    { block: 'text', tag: 'p', content: { html: 'Доставка в Зеленоград, Куркино, а также в Новую Москву - платная, рассчитывается, исходя из километража от МКАД. При доставке за пределы МКАД – от <span class="text text_color_orange">500</span> руб. + <span class="text text_color_prange">50</span> руб. за км. в зависимости от суммы заказа. Иные условия доставки обсуждаются дополнительно, при необходимости.'}},
                    { block: 'text', tag: 'p', content: { html: 'Доставка по России (минимальная сумма заказа <span class="text text_color_orange">15000</span> руб.): Доставка осуществляется с помощью транспортных компаний по их тарифам. Стоимость доставки до терминала транспортной компании в г. Москве - от <span class="text text_color_orange">500</span> руб.(в зависимости от объема груза)'}},
                    { block: 'text', tag: 'p', content: { html: 'Межтерминальную перевозку клиент оплачивает на месте при получении заказа. <span class="text text_color_blue">Мы не доставляем заказы через Почту РФ.</span> Иные условия доставки обсуждаются дополнительно, при необходимости. '}}

                  ]
                }
              ]
            }
          }
        ]
      },
      { block: 'footer' }
    ]
}
