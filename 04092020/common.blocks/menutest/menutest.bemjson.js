block('menutest').content()(function() {
  return [{
    elem:'content',
    content:[{
      block: 'pushy',
      mods: { pushy:'left' },
      content:['123']
    }]
  }]
})
// <nav class="pushy pushy-left">
//     <div class="pushy-content">
//         <ul>
//             <!-- Submenu -->
//             <li class="pushy-submenu">
//                 <button>Submenu</button>
//                 <ul>
//                     <li class="pushy-link"><a href="#">Item 1</a></li>
//                     <li class="pushy-link"><a href="#">Item 2</a></li>
//                     <li class="pushy-link"><a href="#">Item 3</a></li>
//                 </ul>
//             </li>
//             <li class="pushy-link"><a href="#">Item 1</a></li>
//             <li class="pushy-link"><a href="#">Item 2</a></li>
//         </ul>
//     </div>
// </nav>
