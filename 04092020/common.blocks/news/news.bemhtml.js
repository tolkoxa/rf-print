block('news').content()(function() {
  return [{
    elem: 'wrapp',
    content:[
      {
          block: 'title',
          tag: 'h2',
          mods: { 'text-align': 'center' },
          content: 'Новости'
      },
      { elem: 'carusel',
        content:[
          { block: 'swiper-wrapper', content:[
            { block: 'link', url:'#' , mix: { block: 'swiper-slide'}, content: [
              { block: 'image', url: '../../img/work-example/1.jpg' },
              { block: 'title', mods: { bold:true }, content: 'Футболка Rock and Roll' },
              { block: 'text', content: 'Разнообразный и богатый опыт остоянное информационно пропагандистское обеспечение нашей деятельности позволяет...' },
              { block: 'button', mods: { theme: 'rfprint', whiteblue: true, center: true }, content: 'Открыть' }
              ]
            },
            { block: 'link', url:'#' , mix: { block: 'swiper-slide'}, content: [
              { block: 'image', url: '../../img/work-example/2.jpg' },
              { block: 'title', mods: { bold:true }, content: 'Футболка Rock and Roll' },
              { block: 'text', content: 'Разнообразный и богатый опыт остоянное информационно пропагандистское обеспечение нашей деятельности позволяет...' },
              { block: 'button', mods: { theme: 'rfprint', whiteblue: true, center: true }, content: 'Открыть' }
              ]
            },
            { block: 'link', url:'#' , mix: { block: 'swiper-slide'}, content: [
              { block: 'image', url: '../../img/work-example/3.jpg' },
              { block: 'title', mods: { bold:true }, content: 'Футболка Rock and Roll' },
              { block: 'text', content: 'Разнообразный и богатый опыт остоянное информационно пропагандистское обеспечение нашей деятельности позволяет...' },
              { block: 'button', mods: { theme: 'rfprint', whiteblue: true, center: true }, content: 'Открыть' }
            ]
            },
            { block: 'link', url:'#' , mix: { block: 'swiper-slide'}, content: [
                { block: 'image', url: '../../img/work-example/4.jpg' },
                { block: 'title', mods: { bold:true }, content: 'Футболка Rock and Roll' },
                { block: 'text', content: 'Разнообразный и богатый опыт остоянное информационно пропагандистское обеспечение нашей деятельности позволяет...' },
                { block: 'button', mods: { theme: 'rfprint', whiteblue: true, center: true }, content: 'Открыть' }
              ]
            },
            { block: 'link', url:'#' , mix: { block: 'swiper-slide'}, content: [
                { block: 'image', url: '../../img/work-example/1.jpg' },
                { block: 'title', mods: { bold:true }, content: 'Футболка Rock and Roll' },
                { block: 'text', content: 'Разнообразный и богатый опыт остоянное информационно пропагандистское обеспечение нашей деятельности позволяет...' },
                { block: 'button', mods: { theme: 'rfprint', whiteblue: true, center: true }, content: 'Открыть' }
              ]
            },
            { block: 'link', url:'#' , mix: { block: 'swiper-slide'}, content: [
                { block: 'image', url: '../../img/work-example/2.jpg' },
                { block: 'title', mods: { bold:true }, content: 'Футболка Rock and Roll' },
                { block: 'text', content: 'Разнообразный и богатый опыт остоянное информационно пропагандистское обеспечение нашей деятельности позволяет...' },
                { block: 'button', mods: { theme: 'rfprint', whiteblue: true, center: true }, content: 'Открыть' }
              ]
            }
            ]
          },
          { block: 'printing-examples__swiper-pagination', content:'' }
          ]
      },
      { block: 'button', mods: { theme: 'rfprint', whiteblue: true, center: true }, content: 'Посмотреть все' }
    ]
  }]
})
