/* =========================================================
   LP Creator – core-interactions.js
   (FINAL · vollständig · konsistent)
   ========================================================= */

(function () {
  /* =========================================
     DOM READY HELPER
     ========================================= */
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* =========================================
     COUNTER ANIMATED
     ========================================= */
  function initCounterAnimated() {
    var items = document.querySelectorAll(
      '.counter-animated__item > [class^="font-heading-"], .counter-animated__item > [class*=" font-heading-"]'
    );
    if (!items.length) return;

    function startCount(el) {
      var originalText = el.textContent.trim();
      var match = originalText.match(/(\d+[.,]?\d*)/);
      if (!match) return;

      var numberPart = match[1];
      var prefix = originalText.slice(0, match.index);
      var suffix = originalText.slice(match.index + numberPart.length);

      var hasComma = numberPart.indexOf(',') !== -1;
      var cleaned = numberPart.replace(/\./g, '').replace(',', '.');
      var decimals = cleaned.indexOf('.') !== -1 ? cleaned.split('.')[1].length : 0;
      var target = parseFloat(cleaned);
      if (isNaN(target)) return;

      var duration = 1200;
      var start = null;

      function easeOut(t) {
        return t * (2 - t);
      }

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var value = target * easeOut(progress);

        var display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
        if (hasComma) display = display.replace('.', ',');

        el.textContent = prefix + display + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = originalText;
      }

      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      items.forEach(startCount);
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          startCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* =========================================
     ACCORDION (modern)
     ========================================= */
  function initAccordion() {
    var triggers = document.querySelectorAll('.accordion__trigger');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      var item = trigger.closest('.accordion__item');
      var panel = item.querySelector('.accordion__panel');
      if (!item || !panel) return;

      trigger.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0px';
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

/* =========================================
   STICKY FOOTER – FIRST SCROLL + HERO RETURN
   ========================================= */
function initStickyFooter() {
  var footer = document.querySelector('.lp-sticky-footer');
  if (!footer) return;

  var hero = document.querySelector('.hero-split');
  if (!hero) return;

  var hasActivated = false;

  /* ---------- Trigger 1: First Scroll ---------- */
  function onFirstScroll() {
    if (hasActivated) return;
    hasActivated = true;

    footer.classList.add('is-visible');
    window.removeEventListener('scroll', onFirstScroll);
  }

  window.addEventListener('scroll', onFirstScroll, { passive: true });

  /* ---------- Trigger 2: Hero Visibility ---------- */
  if (!('IntersectionObserver' in window)) return;

  var heroObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Hero wieder sichtbar → Footer ausblenden
          footer.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  heroObserver.observe(hero);
}


  /* =========================================
     INIT ALL INTERACTIONS
     ========================================= */
  onReady(function () {
    initCounterAnimated();
    initAccordion();
    initStickyFooter();
  });

})();
