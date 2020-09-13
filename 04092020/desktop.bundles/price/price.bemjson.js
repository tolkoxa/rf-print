module.exports = {
    block: 'page',
    title: 'Title price',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'price.min.css' }
    ],
    scripts: [{ elem: 'js', url: 'price.min.js' }],
    mods: { theme: 'rfprint' },
    content: [
        // {block: 'trafaret'},
        { block: 'header' },
        { block: 'menu-top' },
        {
          block: 'content',
          content: [
            { tag: 'h1', content: 'islands theme' },
            { tag: 'h2', content: 'islands theme' },
            { tag: 'h3', content: 'islands theme' },
            { tag: 'h4', content: 'islands theme' },
            { tag: 'h5', content: 'islands theme' },
            { tag: 'h6', content: 'islands theme' },
            { block: 'text', content: 'text islands theme text' },
          ]
        },
        {
          block: 'content',
          content: ['price']
        },
        {
          block: 'footer',
          content: [
            'footer content goes here!!!'
          ]
        }
    ]
};
