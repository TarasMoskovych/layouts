import $ from 'jquery';

export class Validator {
  constructor(formSelector) {
    this.$form = $(formSelector);

    this._init();
  }

  _init() {
    this._onBlur();
    this._onSubmit();
  }

  _onBlur() {
    this.$form.find('[required]').each((idx, field) => {
      const $field = $(field);
      $field.on('blur', () => this.validate($field.parent()));
    });
  }

  _onSubmit() {
    this.$form.on('submit', e => {
      this.validate(this.$form);

      if (!this.$form[0].checkValidity()) {
        e.preventDefault();
        e.stopPropagation();

        this.$form
          .find('.form-control:invalid')
          .first()
          .trigger('focus');
      }
    });
  }

  validate($element) {
    $element.addClass('was-validated');
  }
}
