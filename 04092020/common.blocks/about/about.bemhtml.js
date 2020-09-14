block('about')(
  addJs()(true),
  content()(function(){
    return [
    { elem: 'wrapp',
      js: true,
      content: [
        {
            block: 'title',
            tag: 'h2',
            mods: { 'text-align': 'center' },
            content: 'О нас'
        },
        {
          block: 'row',
          mods: { vam: 's' },
          content:[
            { elem: 'col',
              elemMods: { sw: 4, s: true },
              content: [
                { block: 'image',
                  url: '../../img/image_form.png'
                }
              ]
            },
            { elem: 'col',
              elemMods: { sw: 4 },
              content: [
                {
                  block: 'about__info',
                  content:[
                    {
                      block:'title',
                      tag: 'h3',
                      content: 'Мы крутые, у нас все быстро, легко и просто'
                    },
                    {
                      block:'text',
                      tag: 'p',
                      content: 'Разнообразный и богатый опыт постоянное информационно пропагандистское обеспечение нашей деятельности позволяет оценить значение существенных финансовых и административных  условий. Не следует, однако забывать, что постоянное информационно пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке новых предложений. Не следует, однако забывать, что укрепление и развитие структуры требуют от нас анализа систем массового участия.'
                    },
                    {
                      block: 'button',
                      mods: { order: 'blue' },
                      mix: { block: 'call-fast-order' },
                      content: { block: 'text', mods: { size: '2xl', text: 'bold' }, content: 'Заказать' }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          block: 'modal',
          mods: {
              autoclosable: true,
              theme: 'islands'
          },
          content: { block: 'form' },
          zIndexGroupLevel: 1
        }
      ]
    }
  ]
  })
)
