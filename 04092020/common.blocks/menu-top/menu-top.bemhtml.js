block('menu-top').content()(function() {
    return [{
        elem: 'container',
        content: [{
            block: 'ul',
            mods: { flex: 'gorizont', 'list-style': 'none', 'pad-marg': 'none' },
            tag: 'ul',
            content: [{
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'l', pc: 'center-center' },
                            content: 'Главная'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'l', pc: 'center-center' },
                            content: 'Услуги и цены'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'l', pc: 'center-center' },
                            content: 'Доставка и оплата'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'l', pc: 'center-center' },
                            content: 'Собственное производство'
                        }]
                    }]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    elemMods: { position: 'relateve', drop: 'down' },
                    content: [{
                            block: 'link',
                            url: '#',
                            mods: { flex: 'cente-center' },
                            content: [{
                                    block: 'text',
                                    mods: { color: 'white' },
                                    content: 'Виды печати'
                                },
                                {
                                    block: 'icon',
                                    mods: { size: 'xs', glyph: 'chevron-down', color: 'white', margin: 'correct' }
                                }
                            ]
                        },
                        {
                            block: 'ul',
                            tag: 'ul',
                            mods: { drop: 'down' },
                            content: [
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на жилетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'active' }, content: 'Печать на толстовках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last' }, content: 'Печать на футболках' } }
                            ]
                        }
                    ]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    elemMods: { position: 'relateve', drop: 'down' },
                    content: [{
                            block: 'link',
                            url: '#',
                            mods: { flex: 'cente-center' },
                            content: [{
                                    block: 'text',
                                    mods: { color: 'white' },
                                    content: 'На чем печатаем'
                                },
                                { block: 'icon', mods: { size: 'xs', glyph: 'chevron-down', color: 'white', margin: 'correct' } }
                            ]
                        },
                        {
                            block: 'ul',
                            tag: 'ul',
                            mods: { drop: 'down' },
                            content: [
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'white' }, content: 'Печать на жилетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на толстовках' } },
                                { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last' }, content: 'Печать на футболках' } }
                            ]
                        }
                    ]
                },
                {
                    elem: 'li',
                    tag: 'li',
                    content: [{
                        block: 'link',
                        url: '#',
                        mods: { decoration: 'none' },
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'l', pc: 'center-center' },
                            content: 'Контакты'
                        }]
                    }]
                }
            ]
        }]
    }]
})





/*
{
    elem: 'wrapp',
    elemMods: { theme: 'blue' },
    content:
          { block: 'ul',
            mods: { flex: 'gorizont', 'list-style': 'none', 'pad-marg': 'none' },
            tag: 'ul',
            content:[
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', mix: { block: 'active'}, content: 'Главная'}
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Услуги и цены'}
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Доставка и оплата'}
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Собственное производство'}
              },
              { elem: 'li',
                tag: 'li',
                elemMods: { position: 'relateve', drop: 'down' },
                content: [
                  { block: 'link', url: '#', mods: { flex: 'cente-center' }, content: [
                   { block: 'text', content: 'Виды печати' },
                   {
                      block: 'icon',
                      mods: { size: 'xs', glyph: 'chevron-down', color:'white', margin: 'correct' }
                  }
                 ]
                  },
                  { block: 'ul', tag: 'ul', mods: { drop: 'down' }, content:[
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на жилетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'active'}, content: 'Печать на толстовках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last'}, content: 'Печать на футболках'} }]
                  }
                ]
              },
              { elem: 'li',
                tag: 'li',
                elemMods: { position: 'relateve', drop: 'down' },
                content: [
                  { block: 'link', url: '#',  mods: { flex: 'cente-center' }, content: [
                    { block: 'text', content: 'На чем печатаем' },
                    { block: 'icon', mods: { size: 'xs', glyph: 'chevron-down', color:'white', margin: 'correct' }}
                    ]
                  },
                  { block: 'ul', tag: 'ul', mods: { drop: 'down' }, content:[
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на жилетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на пакетах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на свитшотах'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на сумках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на ткани'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, content: 'Печать на толстовках'} },
                    { elem: 'li', tag: 'li', content: { block: 'link', url: '#', mods: { color: 'black' }, mix: { block: 'last'}, content: 'Печать на футболках'} }
                  ]}
                ]
              },
              { elem: 'li',
                tag: 'li',
                content: { block: 'link', url: '#', content: 'Контакты'}
              }
            ]
          }
  }
*/


/********************/

// <ul class="menu__links"><li class="menu__link menu__link1 active"><a href="https://rf-print.ru/" title="Шелкография, трафаретная, прямая и шелкотрафаретная печати в Москве">Главная</a></li>
// <li class="menu__link menu__link1"><a href="/prices.html" title="Услуги и цены на печать и продукцию ">Услуги и цены</a></li>
// <li class="menu__link menu__link1"><a href="/shipping-and-payment.html" title="Доставка и оплата">Доставка и оплата</a></li>
// <li class="menu__link menu__link1"><a href="/own-production.html" title="Собственное производство">Собственное производство</a></li>
// <li class="menu__link menu__link1"><a href="/types-printing/" title="Печать методом шелкографии, трафаретной печатью, прямой печатью, экосольвентной печатью, вытравленой печатью, вышивка на ткани">Виды печати 	⇓</a>
//   <ul class="header__menu-dropdown" style="display: none;">
//   <li class="menu__link menu__link2"><a href="/silk-screen-printing.html" title="Шелкография">Шелкография</a></li>
// <li class="menu__link menu__link2"><a href="/screen-printing.html" title="Трафаретная печать">Трафаретная печать</a></li>
// <li class="menu__link menu__link2"><a href="/eco-solvent-printing.html" title="Экосольвентная печать">Экосольвентная печать</a></li>
// <li class="menu__link menu__link2"><a href="/vetravnaya-print.html" title="Вытравная печать">Вытравная печать</a></li>
// <li class="menu__link menu__link2"><a href="/plastisol-seal.html" title="Пластизолевая печать">Пластизолевая печать</a></li>
// <li class="menu__link menu__link2"><a href="/thermal-transfer-printing.html" title="Термотрансферная печать">Термотрансферная печать</a></li>
// <li class="menu__link menu__link2"><a href="/direct-printing.html" title="Прямая печать">Прямая печать</a></li>
// <li class="menu__link menu__link2"><a href="/silk-screen-printing-type-2.html" title="Шелкотрафаретная печать">Шелкотрафаретная печать</a></li>
// <li class="menu__link last menu__link2"><a href="/water-based-printing.html" title="Печать водными красками">Печать водными красками</a></li>
// </ul></li>

// <li class="menu__link menu__link1"><a href="/what-we-print/" title="Печать на футболках, толстовках, свитшотах, сумках, ткани">На чем печатаем 	⇓</a>
// <ul class="header__menu-dropdown" style="display: none;"><li class="menu__link menu__link2"><a href="/vest-printing.html" title="Печать на жилетах"></a></li>
// <li class="menu__link menu__link2"><a href="/package-printing.html" title="Печать на пакетах">Печать на пакетах</a></li>
// <li class="menu__link menu__link2"><a href="/print-on-sweatshirts.html" title="Печать на свитшотах">Печать на свитшотах</a></li>
// <li class="menu__link menu__link2"><a href="/bag-printing.html" title="Печать на сумках">Печать на сумках</a></li>
// <li class="menu__link menu__link2"><a href="/fabric-printing.html" title="Печать на ткани">Печать на ткани</a></li>
// <li class="menu__link menu__link2"><a href="/print-on-hoodies.html" title="Печать на толстовках">Печать на толстовках</a></li>
// <li class="menu__link last menu__link2"><a href="/t-shirt-printing.html" title="Печать на футболках">Печать на футболках</a></li>
// </ul></li>
// <li class="menu__link last menu__link1"><a href="/contacts.html" title="Контакты">Контакты</a></li>
// </ul>