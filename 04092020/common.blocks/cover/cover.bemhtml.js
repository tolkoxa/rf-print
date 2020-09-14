block('cover').content()(function() {
    return [{
        elem: 'container',
        content: [{
                elem: 'plate-text',
                content: [{
                        block: 'text',
                        mods: { color: 'white', weight: '500', size: '4xl', pc: 'left-top', 'line-height': 'xl' },
                        content: 'Печать на одежде и текстильных изделиях'

                    },
                    {
                        block: 'text',
                        mods: { color: 'white', weight: '300', size: 'l', 'line-hight': 'xl', pc: 'left-top' },
                        content: 'Профессиональное оборудование: любой тираж, качественные краски, доступные цены'
                    },
                    {
                        elem: 'benefits',
                        content: [{
                                elem: 'benefit',
                                content: [{
                                        block: 'image',
                                        url: '../../img/cover-benefits/benefit-clock.png',
                                    },
                                    {
                                        block: 'text',
                                        mods: { color: 'white', size: 's', align: 'left', weight: '300', padding: '10', width: '100' },
                                        content: '15 минут — печать одного изделия'
                                    }
                                ]
                            },
                            {
                                elem: 'benefit',
                                content: [{
                                        block: 'image',
                                        url: '../../img/cover-benefits/benefit-t-shirt.png',
                                    },
                                    {
                                        block: 'text',
                                        mods: { color: 'white', size: 's', align: 'left', weight: '300', padding: '10', width: '100' },
                                        content: 'Тираж от одной штуки до бесконечности'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                elem: 'form',
                content: [{
                        elem: 'wrapp',
                        content: [{
                            block: 'text',
                            mods: { color: 'white', weight: '300', size: 'xl', pc: 'left-top' },
                            content: 'Рассчитать заказ'
                        }]
                    },
                    {
                        elem: 'wrapp',
                        content: [{
                            block: 'input',
                            tag: 'input',
                            elem: 'form',
                            placeholder: 'Ваше имя',
                            content: '',
                        }]

                    },
                    {
                        elem: 'wrapp',
                        content: [{
                            block: 'input',
                            tag: 'input',
                            elem: 'form',
                            content: ''
                        }]

                    },
                    {
                        elem: 'wrapp',
                        content: [{
                            block: 'textarea',
                            mods: { theme: 'rfprint' },
                            content: ''
                        }]

                    },
                    {
                        elem: 'wrapp',
                        content: [{
                                block: 'checkbox',
                                mods: {
                                    size: 'l',
                                    checked: false
                                },
                                name: 'name1',
                                val: 'val_1'
                            },

                            {
                                block: 'text',
                                mods: { color: 'white', weight: '300', size: 'm', pc: 'left-top' },
                                content: 'Принимаю пользовательское соглашение и политику конфиденциальности'
                            }
                        ]
                    },
                    {
                        elem: 'wrapp',
                        content: [{
                            block: 'button',
                            tag: 'button',
                            mods: { theme: 'rfprint' },
                            content: 'Сделать расчёт'
                        }]
                    }

                ]
            }
        ]
    }]
})