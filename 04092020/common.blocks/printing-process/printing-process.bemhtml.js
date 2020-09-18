block('printing-process').content()(function() {

    return [{
        elem: 'container',
        elemMods: { border: 'radius' },
        content: [{
                elem: 'title',
                content: [{
                    block: 'text',
                    elem: 'title',
                    content: 'Процесс печати'
                }]
            },
            {
                elem: 'video',
                content: [{
                    block: 'video',
                    // tag: 'video',
                    // controls: true,
                    // url: '#'
                    content: [{
                        block: 'image',
                        url: '../../img/video/video-poster.png'
                    }]

                }]
            }
        ]
    }]
})