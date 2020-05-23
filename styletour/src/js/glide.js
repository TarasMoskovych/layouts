// https://glidejs.com/docs/extending-transformers/
import Glide from '@glidejs/glide'

new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 5,
  breakpoints: {
    991: {
      perView: 4
    },
    767: {
      perView: 3
    },
  }
}).mount();
