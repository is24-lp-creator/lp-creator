(function (window, document) {
    'use strict';
  
    const FORM_ID = 'web-to-lead-form';
    const ERROR_ID = 'recaptcha-error';
    const CAPTCHA_SETTINGS_NAME = 'captcha_settings';
  
    let bound = false;
    let intervalId = null;
  
    /**
     * Updates Salesforce captcha_settings timestamp
     */
    function updateTimestamp() {
      const response = document.getElementById('g-recaptcha-response');
      const field = document.getElementsByName(CAPTCHA_SETTINGS_NAME)[0];
  
      if (!field) return;
  
      try {
        if (!response || !response.value || response.value.trim() === '') {
          const data = JSON.parse(field.value || '{}');
          data.ts = Date.now();
          field.value = JSON.stringify(data);
        }
      } catch (e) {
        // fail silently to avoid breaking AEM
        console.warn('[Form] captcha_settings update failed', e);
      }
    }
  
    /**
     * reCAPTCHA callback (must be global for Google)
     */
    function onRecaptchaCompleted() {
      const el = document.getElementById(ERROR_ID);
      if (el) {
        el.hidden = true;
        el.setAttribute('aria-hidden', 'true');
      }
    }
  
    /**
     * Shows recaptcha error
     */
    function showRecaptchaError() {
      const el = document.getElementById(ERROR_ID);
      if (el) {
        el.hidden = false;
        el.removeAttribute('aria-hidden');
      }
    }
  
    /**
     * Validates form + recaptcha before submit
     */
    function handleSubmit(e, form) {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
  
      const ready = typeof window.grecaptcha !== 'undefined' &&
                    typeof window.grecaptcha.getResponse === 'function';
  
      const token = ready ? window.grecaptcha.getResponse() : '';
  
      if (!token || token.trim() === '') {
        e.preventDefault();
        showRecaptchaError();
      }
    }
  
    /**
     * Attach all listeners safely (AEM-safe: prevents duplicate binding)
     */
    function bindForm() {
      if (bound) return;
  
      const form = document.getElementById(FORM_ID);
      if (!form) return;
  
      bound = true;
  
      form.addEventListener('submit', function (e) {
        handleSubmit(e, form);
      });
  
      console.info('[Form] bound successfully');
    }
  
    /**
     * Init
     */
    function init() {
      bindForm();
  
      // timestamp updater (Salesforce requirement)
      intervalId = window.setInterval(updateTimestamp, 500);
    }
  
    /**
     * DOM ready (AEM-safe)
     */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
    /**
     * Expose callback globally for Google reCAPTCHA
     */
    window.onRecaptchaCompleted = onRecaptchaCompleted;
  
  })(window, document);