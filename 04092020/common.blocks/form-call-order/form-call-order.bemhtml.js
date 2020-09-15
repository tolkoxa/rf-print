block('form-call-order')(
  tag()('form'),
  addAttrs()(
    {
      name: 'call-order',
      id: 'form-call-order',
      action: '#form-call-order',
      enctype: 'multipart/form-data',
      method: 'post'
    }
  ),
  content()(function() {

  return [
    {
      elem: 'wrapp',
      content: [
        { elem: 'relContainer',
          content: [
            { tag: 'label',
              attrs: { for: 'typeprint' },
              content: { block: 'text', mods: { size: 'xl', color: 'gray' }, content: ['Укажите свой телефон', { block: 'req', tag: 'span', content: '*'}] },
            },{tag: 'br'},
            {
              block: 'input',
              mods: {
                  theme: 'rfprint',
                  size: 'm'
              },
              attrs: { required: true },
              placeholder: '+7 (___) ___ __ __*',
              name: 'phone',
              val: '',
            },
            {tag: 'br'},{tag: 'br'},
            {
              block: 'button',
              mods: {
                theme: 'rfprint',
                position: 'middle',
                order: 'blue',
                type: 'submit'
              },
              id: 'btn-call-order',
              content: [{
                  block: 'text',
                  mods: { color: 'white' },
                  tag: 'span',
                  content: { block: 'text', mods: { size: 'l', text: 'bold' }, content: 'Получить консультацию' }
              }]
            }
          ]
        }
      ]
    }
  ]
}))
// var form = '<form id="form-call-order" class="form consult modal" action="[~[*id*]~]" method="post">';
// 	form += '<input type="hidden" name="formid" value="form_order-call" />';
// 	form += '<div class="form__input"><input type="phone" placeholder="+7 (___) ___ __ __*" name="phone" value="" /></div>';
// 	form += '<div class="form__button"><input type="submit" value="Получить консультацию" class="button" /></div>';
// 	form += '<div class="form__agreement">Нажимая кнопку "Заказать звонок", <br />Вы автоматически принимаете условия "<a href="/terms-of-use.html" target="_blank">Пользовательского соглашения</a></div>';
//   form += '</form>';
