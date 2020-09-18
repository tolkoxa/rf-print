block('pushy')(
  tag()('nav'),
  content()(function() {
    return [
      {
      block: 'pushy-content',
      content:
        {
          block: 'ul',
          attrs: {'itemscope': true, itemtype:'http://www.schema.org/SiteNavigationElement'},
          tag:'ul',
          content:[
            { block: 'pushy-link', tag: 'li', attrs: { itemprop: "name" }, content: { block: 'link', url:'#', content:'Главная'} },
            { block: 'pushy-link', tag: 'li', attrs: { itemprop: "name" }, content: { block: 'link', url:'#', content:'Услуги и цены'} },
            { block: 'pushy-link', tag: 'li', attrs: { itemprop: "name" }, content: { block: 'link', url:'#', content:'Доставка и оплата'} },
            { block: 'pushy-link', tag: 'li', attrs: { itemprop: "name" }, content: { block: 'link', url:'#', content:'Собственное производство'} },
            {
              block: 'pushy-submenu', tag: 'li', attrs: { itemprop: "name" }, content:[
              { block: 'button', mods: { theme: 'rfprint' }, content:'Виды печати' },
              { block: 'ul', tag:'ul', content: [
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Шелкография'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Трафаретная печать'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Экосольвентная печать'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Вытравная печать'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Пластизолевая печать'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Термотрансферная печать'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Прямая печать'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Шелкотрафаретная печать'
                    }
                },
                {
                  block: 'pushy-link', tag: 'li', content:
                    {
                      block: 'link',
                      url:'#',
                      mix: { block: 'pushy-link' },
                      content: 'Печать водными красками'
                    }
                }
                ]
              }]
            },
            {
              block: 'pushy-submenu', tag: 'li', attrs: { itemprop: "name" }, content: [
              { block: 'button', mods: { theme: 'rfprint' }, content:'На чем печатаем' },
              { block: 'ul', tag:'ul', content:[
                  {
                    block: 'pushy-link', tag: 'li', content:
                      {
                        block: 'link',
                        url:'#',
                        mix: { block: 'pushy-link' },
                        content: 'Печать на жилетах'
                      }
                  },
                  {
                    block: 'pushy-link', tag: 'li', content:
                      {
                        block: 'link',
                        url:'#',
                        mix: { block: 'pushy-link' },
                        content: 'Печать на пакетах'
                      }
                  },
                  {
                    block: 'pushy-link', tag: 'li', content:
                      {
                        block: 'link',
                        url:'#',
                        mix: { block: 'pushy-link' },
                        content: 'Печать на свитшотах'
                      }
                  },
                  {
                    block: 'pushy-link', tag: 'li', content:
                      {
                        block: 'link',
                        url:'#',
                        mix: { block: 'pushy-link' },
                        content: 'Печать на сумках'
                      }
                  },
                  {
                    block: 'pushy-link', tag: 'li', content:
                      {
                        block: 'link',
                        url:'#',
                        mix: { block: 'pushy-link' },
                        content: 'Печать на ткани'
                      }
                  },
                  {
                    block: 'pushy-link', tag: 'li', content:
                      {
                        block: 'link',
                        url:'#',
                        mix: { block: 'pushy-link' },
                        content: 'Печать на толстовках'
                      }
                  },
                  {
                    block: 'pushy-link', tag: 'li', content:
                      {
                        block: 'link',
                        url:'#',
                        mix: { block: 'pushy-link' },
                        content: 'Печать на футболках'
                      }
                  }
                ]
              },
            ]
            },
            {
              block: 'pushy-link', tag: 'li', attrs: { itemprop: "name" }, content: { block: 'link', url:'/calculator.html', content:'Калькулятор'}
            },
            {
              block: 'pushy-link', tag: 'li', attrs: { itemprop: "name" }, content: { block: 'link', url:'#', content:'Контакты'}
            }
          ]
        }
      }
    ]
  })
)
