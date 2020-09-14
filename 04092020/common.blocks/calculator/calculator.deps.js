({
  shouldDeps: [
    { block: 'text' },
    { block: 'title' },
    { block: 'icon', mods: { glyph: 'arrow-right' } },
    { block: 'input' },
    { block: 'button' },
    { block: 'textarea' },
    { block: 'select', mods: { mode: 'check', theme: 'islands', size: 'm' } },
    { block: 'select', mods: { mode: 'radio-check',theme: 'islands', size: 'm' } },
    { block: 'attach', mods: { theme: 'islands', size: 'm', disabled: true }, button: 'Выберите файл', noFileText: 'Файл не выбран' },
    { block: 'checkbox-group', mods: { theme: 'islands', size: 'm', type: 'line' } }
  ]
})
