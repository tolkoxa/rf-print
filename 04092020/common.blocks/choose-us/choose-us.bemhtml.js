block('choose-us').content()(function() {

    return [{
        elem: 'container',
        elemMods: { border: 'radius' },
        content: [{
                elem: 'title',
                content: [{
                    block: 'text',
                    elem: 'title',
                    content: 'Почему стоит выбрать нашу компанию?'
                }]
            },
            {
                elem: 'items',
                elemMods: { 'row': true },
                content: [{
                        block: 'block-shadow',
                        mods: { 'flex-column': true },
                        content: [{
                                block: 'text',
                                mods: { size: 'l', 'line-hight': 'xl', align: 'center', width_200: true, 'padding-bottom': '20', weight: '500' },
                                content: 'Профессональная печать «под ключ»'
                            },
                            {
                                block: 'image',
                                url: '../../img/choose-us/t-shirt-heart.png'
                            },
                            {
                                block: 'text',
                                mods: { color: 'grey', size: 'm', 'line-hight': 'xl', align: 'center', 'padding-top': '15', weight: '400' },
                                content: 'Профессональная печать «под ключ» от разработки макета до доставки'
                            }
                        ]
                    },
                    {
                        block: 'block-shadow',
                        mods: { 'flex-column': true },
                        content: [{
                                block: 'text',
                                mods: { size: 'l', 'line-hight': 'xl', align: 'center', width_200: true, 'padding-bottom': '25', weight: '500' },
                                content: 'Высокое качество печати'
                            },
                            {
                                block: 'image',
                                url: '../../img/choose-us/like.png'
                            },
                            {
                                block: 'text',
                                mods: { color: 'grey', size: 'm', 'line-hight': 'xl', align: 'center', 'padding-top': '15', weight: '400' },
                                content: 'Высочайшее качество печати, подтвержденное заказами известных компаний'
                            }
                        ]
                    }, {
                        block: 'block-shadow',
                        mods: { 'flex-column': true },
                        content: [{
                                block: 'text',
                                mods: { size: 'l', 'line-hight': 'xl', align: 'center', width_200: true, 'padding-bottom': '25', weight: '500' },
                                content: 'Сроки от 1-го дня'
                            },
                            {
                                block: 'image',
                                url: '../../img/choose-us/clock.png'
                            },
                            {
                                block: 'text',
                                mods: { color: 'grey', size: 'm', 'line-hight': 'xl', align: 'center', 'padding-top': '15', weight: '400' },
                                content: 'Сроки изготовления: от 1-го дня, так как мы являемся производителем'
                            }
                        ]
                    },
                    {
                        elem: 'items',
                        elemMods: { 'column': true },
                        content: [{
                                block: 'block-shadow',
                                mods: { 'flex-row': true },
                                content: [{

                                        block: 'image',
                                        url: '../../img/choose-us/printer.png',
                                    },
                                    {
                                        block: 'text',
                                        mods: { size: 'l', 'line-hight': 'xl', align: 'center', width_100: true, 'padding-bottom': '20', weight: '500' },
                                        content: 'Эксклюзивные виды печати'
                                    }
                                ]
                            },
                            {
                                block: 'block-shadow',
                                mods: { 'flex-row': true },
                                content: [{

                                        block: 'image',
                                        url: '../../img/choose-us/sofa.png',
                                    },
                                    {
                                        block: 'text',
                                        mods: { size: 'l', 'line-hight': 'xl', align: 'center', width_100: true, 'padding-bottom': '20', weight: '500' },
                                        content: 'Удобство и сервис'
                                    }
                                ]
                            }
                        ]



                    }
                ]
            }
        ]
    }]
})