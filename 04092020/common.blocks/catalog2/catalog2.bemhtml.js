block('catalog2').content()(function() {
  return [{
    elem: 'wrapp',
    content:[
      {
          block: 'title',
          tag: 'h2',
          mods: { 'text-align': 'center' },
          content:'Каталог'
      },
      {
          elem: 'carusel',
          content: [
              { block: 'swiper-wrapper',
                mix: {block: 'swiper-slide'},
                attrs: { itemscope: true, itemprop: 'offers', itemtype: 'https://schema.org/Service' },
                content:[
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/1.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/2.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/1.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/2.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/1.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/2.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/1.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/2.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/1.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                  {
                    block: 'swiper-slide',
                    content:{
                      block: 'catalog2-tab2',
                      content:[
                        { block:'image', url: '../../img/catalog/2.jpg' },
                        { elem: 'cover', content: ''},
                        { block: 'link', url:'#', mix: { block: 'catalog2-tab2__info' }, content:[
                          { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                          { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                            [
                              { tag: 'li', content: '- очень простой метод переноса изображения' },
                              { tag: 'li', content: '- работа с разными материалами' },
                              { tag: 'li', content: '- устойчивость и долговечность картинки' },
                              { tag: 'li', content: '- большой спектр красок' },
                              { tag: 'li', content: '- гиппоаллергенность' },
                              { tag: 'li', content: '- низкая стоимость' }
                            ]
                          }
                        ]}
                      ]
                      }
                  },
                ]
              },
              { block: 'catalog2__swiper-pagination', content:'' }
            ]
      }
    ]
  }]
});
