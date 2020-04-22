export class Arrow {

  constructor(jQuery) {
    if (!jQuery) {
      throw new Error(`jQuery is not defined`);
    }

    this.$ = jQuery;
    jQuery(this.init.bind(this));
  }

  init() {
    this.initVariables();
    this.initListeners();
  }

  initVariables() {
    const $ = this.$;

    this.$window = $(window);
    this.$document = $(document);
    this.$htmlBody = $('html, body');
    this.$arrowUp = $('.arrow-up');
  }

  initListeners() {
    this.$window.on('scroll', this.onWindowScroll.bind(this));
    this.$arrowUp.on('click', this.onArrowClick.bind(this));
  }

  onWindowScroll() {
    const height = this.$window.scrollTop();

    if (height > 200) {
      this.$arrowUp.fadeIn();
    } else {
      this.$arrowUp.fadeOut();
    }
  }

  onArrowClick(e) {
    e.preventDefault();

    this.$htmlBody.animate({ scrollTop: 0 }, 'slow');
  }
}
