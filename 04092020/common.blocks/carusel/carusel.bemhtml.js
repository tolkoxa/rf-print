block('carusel').content()(function() {
  return [{
    elem: 'swiper-container',
    mix: [ { block: 'swiper-container'} ],
    content:[
      { block: 'swiper-wrapper', content:[
        { block: 'swiper-slide', content: { block: 'image', url: '../../img/banner1.jpg' } },
        { block: 'swiper-slide', content: { block: 'image', url: '../../img/banner2.jpg' } },
        { block: 'swiper-slide', content: { block: 'image', url: '../../img/banner3.jpg' } },
        { block: 'swiper-slide', content: { block: 'image', url: '../../img/banner1.jpg' } },
        { block: 'swiper-slide', content: { block: 'image', url: '../../img/banner2.jpg' } },
        { block: 'swiper-slide', content: { block: 'image', url: '../../img/banner3.jpg' } }
      ]},
      { block: 'swiper-pagination', content:[]},
      { block: 'swiper-button-prev', content:[{ block: 'icon', mods: { size: 's', glyph: 'chevron-left', color:'white', 'margin-svg': 'off' }}]},
      { block: 'swiper-button-next', content:[{ block: 'icon', mods: { size: 's', glyph: 'chevron-right', color:'white', 'margin-svg': 'off' }}]},
    ]}]
})
