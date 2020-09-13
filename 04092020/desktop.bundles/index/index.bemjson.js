module.exports = {
    block: 'page',
    title: 'РФ Принт',
    favicon: '../favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css' },
        { elem: 'css', url: 'index.min.css' },
    ],
    scripts: [
        { elem: 'js', url: 'index.min.js' },
        { elem: 'js', url: 'https://code.jquery.com/jquery-3.4.1.min.js' },
        { elem: 'js', url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js' },
        { elem: 'js', url: '../../libs/action.js' }
    ],
    mods: { theme: 'rfprint' },
    content: [
        { block: 'header' },
        { block: 'menu-top', mix: { block: 'page_hide_mob' } },
        { block: 'cover' },
        { block: 'choose-us' },
        { block: 'services' },
        { block: 'calculator' },
        { block: 'description' },
        { block: 'our-clients' },
        { block: 'our-work' },
        { block: 'social' },
        { block: 'payment-methods' },
        { block: 'printing-process' },
        { block: 'useful-info' },
        { block: 'bottom-form' },
        { block: 'footer', content: '' },
    ]
};