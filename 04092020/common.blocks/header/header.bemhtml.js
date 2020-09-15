block('header').content()(function() {

    return [{
        elem: 'container',
        elemMods: { border: 'radius' },
        content: [{
                elem: 'logo',
                content: [{
                    block: 'link',
                    url: '/',
                    content: [{ block: 'logo' }, ]
                }]
            },
            {
                elem: 'header-text',
                elemMods: { width: '300', 'padding-right': '15', 'padding-left': '20' },
                content: [{
                    block: 'text',
                    mods: { color: 'gray' },
                    // mix: [{ block: 'page_hide_mob' }, { block: 'text_color_grey' }],
                    content: 'Шелкография на изделиях в Москве с доставкой по России и СНГ'
                }]
            },
            {
                elem: 'header-text',
                elemMods: { width: '260', 'padding-right': '15', 'padding-left': '20' },
                content: [{
                        block: 'image',
                        url: '../../img/map-point.jpg',
                        mods: { 'padding-right': '15' }
                    },
                    {
                        block: 'text',
                        mods: { color: 'gray' },
                        content: 'г.Москва, Павелецкая наб. д.2'
                    }
                ]
            },
            {
                elem: 'mode',
                content: [{
                        block: 'text',
                        mods: { color: 'gray' },
                        content: 'Ежедневно: 09:00 - 20:00'
                    },
                    {
                        elem: 'header-text',
                        content: [{
                                block: 'image',
                                url: '../../img/icons/icon-mail.png',
                                mods: { 'padding-right': '10' }
                            },
                            {
                                block: 'link',
                                mods: { color: 'blue', decoration: 'none' },
                                url: 'mailto:order@rf-print.ru',
                                content: [{
                                    block: 'text',
                                    content: 'order@rf-print.ru'
                                }]
                            }
                        ]
                    }
                ]
            },
            {
                elem: 'mode',
                content: [{
                        block: 'text',
                        mods: { size: 'xl' },
                        content: '8 (495) 189-73-96'
                    },
                    {
                        elem: 'header-text',
                        content: [{
                            block: 'link',
                            mods: { color: 'blue', decoration: 'none' },
                            mix: [{ block: 'text_size_xl' }],
                            url: '#',
                            content: [{
                                block: 'text',
                                content: 'Заказать звонок'
                            }]
                        }]
                    }
                ]
            }

        ]
    }]
})


/*
block: 'row',
            mods: { vam: 'l' },
            content: [{
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'header_border-right' }, { block: 'header_flex_content-row-center' }],
                    content: [{
                            elem: 'logo',
                            mix: { block: 'page_hide_mob' },
                            content: {
                                block: 'link',
                                url: '/',
                                content: [
                                    { block: 'logo' },
                                ]
                            }
                        },
                        {
                            block: 'link',
                            mix: [{ block: 'pushy-link' }, { block: 'page_hide_pc' }],
                            content: {
                                block: 'icon',
                                mods: { size: 'm', glyph: 'bars', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-center' }, { block: 'header_border-right' }],
                    content: [{
                        block: 'text',
                        mix: { block: 'page_hide_mob' },
                        content: 'Шелкография на изделиях в Москве с доставкой по России и СНГ'
                    }]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-center' }, { block: 'header_border-right' }],
                    content: [{
                            elem: 'address',
                            mix: { block: 'page_hide_mob' },
                            content: {
                                block: 'link',
                                url: '/contacts',
                                content: 'г.Москва, Павелецкая наб. д.2'
                            }
                        },
                        {
                            block: 'link',
                            mix: { block: 'page_hide_pc' },
                            url: '/calculator.html',
                            content: {
                                block: 'icon',
                                mods: { size: 'm', glyph: 'calculator', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-center' }, { block: 'header_border-right' }],
                    content: [{
                            elem: 'email',
                            mix: { block: 'page_hide_mob' },
                            content: {
                                block: 'link',
                                url: 'mailto:order@rf-print.ru',
                                content: 'Email для заказов: order@rf-print.ru'
                            }
                        },
                        {
                            block: 'link',
                            url: 'mailto:order@rf-print.ru',
                            content: {
                                block: 'icon',
                                mix: { block: 'page_hide_pc' },
                                mods: { size: 'm', glyph: 'envelope-o', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
                {
                    elem: 'col',
                    elemMods: { lw: 2, s: true },
                    mix: [{ block: 'text_mob_center-center' }, { block: 'text_pc_center-right' }],
                    content: [{
                            elem: 'phone',
                            mix: { block: 'page_hide_mob' },
                            content: [{
                                    block: 'link',
                                    url: 'tel:+74951086935',
                                    mods: { color: 'black' },
                                    mix: { block: 'text_size_xxl' },
                                    content: '+7 (495)108 69 35'
                                },

                                { tag: 'br' },
                                { tag: 'br' },

                                {
                                    block: 'text',
                                    content: [{
                                            block: 'icon',
                                            mods: { size: 's', glyph: 'phone', color: 'black', 'mr-r': '15', 'margin-svg': 'off' }
                                        },
                                        { block: 'text', tag: 'span', mods: { cursor: 'pointer' }, mix: { block: 'js-call-order' }, content: 'Заказать звонок' }
                                    ]
                                }
                            ]
                        },
                        {
                            block: 'link',
                            mods: { padding: '20' },
                            mix: { block: 'page_hide_pc' },
                            url: 'tel:+74951086935',
                            content: {
                                block: 'icon',
                                mods: { size: 'm', glyph: 'phone', color: 'white', 'margin-svg': 'off' }
                            }
                        }
                    ]
                },
            ]
        }
*/