$(() => {
  const $slider = $('.slider .owl-carousel');
  const $featured = $('.featured .owl-carousel');
  const $iconsSearch = $('.icons__search');

  $iconsSearch.find('.icons__img').on('click', () => $iconsSearch.addClass('icons__search--active'));
  $iconsSearch.on('click', 'button', (e) => {
    e.preventDefault();
    $iconsSearch.removeClass('icons__search--active');
  });

  const initCarousel = ($wrapper, options) => {
    const { margin, responsive } = options;

    $wrapper.owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      margin: margin || 0,
      navText: [],
      responsive,
    });
  };

  initCarousel($slider, {
    responsive: {
      0: {
        items: 1,
        dots: true,
        nav: false,
      },
      768: {
        items: 1
      }
    }
  });

  initCarousel($featured, {
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2
      },
      680: {
        items: 3
      },
      1024: {
        items: 4
      }
    }
  });
});
