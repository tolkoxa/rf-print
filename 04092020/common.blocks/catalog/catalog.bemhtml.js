block('catalog').content()(function() {
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
            block: 'owl-carousel',
            attrs: { id: 'owl-catalog', itemscope: true, itemprop: 'offers', itemtype: 'https://schema.org/Service' },
            content: [
              /////////////////////////////////////////////////////////
              {
                block: 'catalog-tab',
                content: [
                  { elem:'tab-1',
                    content:[
                      { block:'image', url: '../../img/catalog/1.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Шелкотрафа- ретная печать' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: '- очень простой метод переноса изображения' },
                            { tag: 'li', content: '- работа с разными материалами'},
                            { tag: 'li', content: '- устойчивость и долговечность картинки'},
                            { tag: 'li', content: '- большой спектр красок'},
                            { tag: 'li', content: '- гиппоаллергенность'},
                            { tag: 'li', content: '- низкая стоимость'}
                          ]
                        }
                      ]}
                    ]
                  },
                  { elem:'tab-2',
                    content:[
                      { block:'image', url: '../../img/catalog/2.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Вытравная печать' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: '- разнообразие цветовой палитры '},
                            { tag: 'li', content: '- качественный и стойкий результат '},
                            { tag: 'li', content: '- сохраняются свойства окрашиваемой ткани'},
                            { tag: 'li', content: '- изделия выдерживают до тридцати стирок'},
                            { tag: 'li', content: '- быстрая скорость изготовления'},
                            { tag: 'li', content: '- стетичность и красота'}
                          ]
                        }
                        ]}
                    ]
                  }
                ]
              },
              {
                block: 'catalog-tab',
                content: [
                  { elem:'tab-1',
                    content:[
                      { block:'image', url: '../../img/catalog/2.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'Пенящаяся' },
                            { tag: 'li', content: 'Термочувствительная'},
                            { tag: 'li', content: 'Металлосодержащая'},
                            { tag: 'li', content: 'Флюоресцентная'},
                            { tag: 'li', content: 'Глянцевая'},
                            { tag: 'li', content: 'Прозрачная'}
                          ]
                        }
                      ]}
                    ]
                  },
                  { elem:'tab-2',
                    content:[
                      { block:'image', url: '../../img/catalog/1.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'пенящаяся'},
                            { tag: 'li', content: 'термочувствительная'},
                            { tag: 'li', content: 'металлосодержащая'},
                            { tag: 'li', content: 'флюоресцентная'},
                            { tag: 'li', content: 'глянцевая'},
                            { tag: 'li', content: 'прозрачная'}
                          ]
                        }
                        ]}
                    ]
                  }
                ]
              },
              {
                block: 'catalog-tab',
                content: [
                  { elem:'tab-1',
                    content:[
                      { block:'image', url: '../../img/catalog/1.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'Пенящаяся' },
                            { tag: 'li', content: 'Термочувствительная'},
                            { tag: 'li', content: 'Металлосодержащая'},
                            { tag: 'li', content: 'Флюоресцентная'},
                            { tag: 'li', content: 'Глянцевая'},
                            { tag: 'li', content: 'Прозрачная'}
                          ]
                        }
                      ]}
                    ]
                  },
                  { elem:'tab-2',
                    content:[
                      { block:'image', url: '../../img/catalog/1.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'пенящаяся'},
                            { tag: 'li', content: 'термочувствительная'},
                            { tag: 'li', content: 'металлосодержащая'},
                            { tag: 'li', content: 'флюоресцентная'},
                            { tag: 'li', content: 'глянцевая'},
                            { tag: 'li', content: 'прозрачная'}
                          ]
                        }
                        ]}
                    ]
                  }
                ]
              },
              {
                block: 'catalog-tab',
                content: [
                  { elem:'tab-1',
                    content:[
                      { block:'image', url: '../../img/catalog/2.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'Пенящаяся' },
                            { tag: 'li', content: 'Термочувствительная'},
                            { tag: 'li', content: 'Металлосодержащая'},
                            { tag: 'li', content: 'Флюоресцентная'},
                            { tag: 'li', content: 'Глянцевая'},
                            { tag: 'li', content: 'Прозрачная'}
                          ]
                        }
                      ]}
                    ]
                  },
                  { elem:'tab-2',
                    content:[
                      { block:'image', url: '../../img/catalog/2.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'пенящаяся'},
                            { tag: 'li', content: 'термочувствительная'},
                            { tag: 'li', content: 'металлосодержащая'},
                            { tag: 'li', content: 'флюоресцентная'},
                            { tag: 'li', content: 'глянцевая'},
                            { tag: 'li', content: 'прозрачная'}
                          ]
                        }
                        ]}
                    ]
                  }
                ]
              },
              {
                block: 'catalog-tab',
                content: [
                  { elem:'tab-1',
                    content:[
                      { block:'image', url: '../../img/catalog/1.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'Пенящаяся' },
                            { tag: 'li', content: 'Термочувствительная'},
                            { tag: 'li', content: 'Металлосодержащая'},
                            { tag: 'li', content: 'Флюоресцентная'},
                            { tag: 'li', content: 'Глянцевая'},
                            { tag: 'li', content: 'Прозрачная'}
                          ]
                        }
                      ]}
                    ]
                  },
                  { elem:'tab-2',
                    content:[
                      { block:'image', url: '../../img/catalog/2.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'пенящаяся'},
                            { tag: 'li', content: 'термочувствительная'},
                            { tag: 'li', content: 'металлосодержащая'},
                            { tag: 'li', content: 'флюоресцентная'},
                            { tag: 'li', content: 'глянцевая'},
                            { tag: 'li', content: 'прозрачная'}
                          ]
                        }
                        ]}
                    ]
                  }
                ]
              },
              {
                block: 'catalog-tab',
                content: [
                  { elem:'tab-1',
                    content:[
                      { block:'image', url: '../../img/catalog/1.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'Пенящаяся' },
                            { tag: 'li', content: 'Термочувствительная'},
                            { tag: 'li', content: 'Металлосодержащая'},
                            { tag: 'li', content: 'Флюоресцентная'},
                            { tag: 'li', content: 'Глянцевая'},
                            { tag: 'li', content: 'Прозрачная'}
                          ]
                        }
                      ]}
                    ]
                  },
                  { elem:'tab-2',
                    content:[
                      { block:'image', url: '../../img/catalog/2.jpg' },
                      { block: 'link', url:'#', mix: { block: 'catalog-tab__info' }, content:[
                        { block:'title', mods: { color: 'white', size:'xxl' }, attrs:{ itemprop: 'name' }, content: 'Толстовки' },
                        { block:'ul', tag: 'ul', mods: { theme: 'rfprint'}, attrs: { itemprop:'description' }, content:
                          [
                            { tag: 'li', content: 'пенящаяся'},
                            { tag: 'li', content: 'термочувствительная'},
                            { tag: 'li', content: 'металлосодержащая'},
                            { tag: 'li', content: 'флюоресцентная'},
                            { tag: 'li', content: 'глянцевая'},
                            { tag: 'li', content: 'прозрачная'}
                          ]
                        }
                        ]}
                    ]
                  }
                ]
              }
            ]
          }
    ]
  }]
})
