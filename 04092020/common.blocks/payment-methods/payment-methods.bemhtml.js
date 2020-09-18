block('payment-methods').content()(function() {
    return [{
        elem: 'container',
        elemMods: { border: 'radius' },
        content: [{
                elem: 'title',
                content: [{
                    block: 'text',
                    elem: 'title',
                    content: 'Способы оплаты'
                }]
            },
            {
                elem: 'items',
                elemMods: { 'padding-bottom': '20' },
                content: [{
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-visa.png',
                        }]
                    },
                    {
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-mastercard.png',
                        }]
                    },
                    {
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-cash.png',
                        }]
                    },
                    {
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-mir.png',
                        }]
                    }

                ]
            },
            {
                elem: 'items',
                content: [{
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-webmoney.png',
                        }]
                    },
                    {
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-yandex.png',
                        }]
                    },
                    {
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-sberbank.png',
                        }]
                    },
                    {
                        elem: 'pay-block',
                        content: [{
                            block: 'image',
                            url: '../../img/payments/pay-qiwi.png',
                        }]
                    }

                ]
            }
        ]

    }]
})