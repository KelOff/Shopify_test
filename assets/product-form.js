if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      this.submitButton = this.querySelector('[type="submit"]');
      if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

      this.hideErrors = this.dataset.hideErrors === 'true';
    }

    async onSubmitHandler(evt) {
      evt.preventDefault();
      if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      this.handleErrorMessage();

      this.submitButton.setAttribute('aria-disabled', true);
      this.submitButton.classList.add('loading');
      this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      if (this.cart) {
        formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
        formData.append('sections_url', window.location.pathname);
        this.cart.setActiveElement(document.activeElement);
      }
      
      const sellingPlanId = window.getCurrentSellingPlanId?.();
      if (sellingPlanId) formData.append("selling_plan", sellingPlanId);
      
      config.body = formData;

      try {
        const response = await fetch(`${routes.cart_add_url}`, config);
        const data = await response.json();

        if (data.status) {
          publish(PUB_SUB_EVENTS.cartError, {source: 'product-form', productVariantId: formData.get('id'), errors: data.description, message: data.message});
          this.handleErrorMessage(data.description);

          const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
          if (!soldOutMessage) return;
          this.submitButton.setAttribute('aria-disabled', true);
          this.submitButton.querySelector('span').classList.add('hidden');
          soldOutMessage.classList.remove('hidden');
          this.error = true;
          return;
        }

        const productId = formData.get('id');
        const gridItem = this.closest('.grid__item');
        
        if (gridItem) {
          gridItem.style.transition = 'opacity 0.5s ease';
          gridItem.style.opacity = '0';
          
          setTimeout(() => {
            gridItem.remove();
            
            const sliderCounterTotal = document.querySelector('.slider-counter--total');
            if (sliderCounterTotal) {
              const currentTotal = parseInt(sliderCounterTotal.textContent);
              if (!isNaN(currentTotal)) {
                sliderCounterTotal.textContent = (currentTotal - 1).toString();
              }
            }
          }, 500);
        }

        if (!this.cart) {
          window.location = window.routes.cart_url;
          return;
        }

        if (!this.error) publish(PUB_SUB_EVENTS.cartUpdate, {source: 'product-form', productVariantId: formData.get('id')});
        this.error = false;
        
        const quickAddModal = this.closest('quick-add-modal');
        if (quickAddModal) {
          document.body.addEventListener('modalClosed', () => {
            setTimeout(() => { this.cart.renderContents(data) });
          }, { once: true });
          quickAddModal.hide(true);
        } else {
          this.cart.renderContents(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.submitButton.classList.remove('loading');
        if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
        if (!this.error) this.submitButton.removeAttribute('aria-disabled');
        this.querySelector('.loading-overlay__spinner').classList.add('hidden');
      }
    }

    handleErrorMessage(errorMessage = false) {
      if (this.hideErrors) return;

      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      if (!this.errorMessageWrapper) return;
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  });
}