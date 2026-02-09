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
   STICKY FOOTER – SCROLL DOWN / HERO VISIBILITY (SOFTER)
   ========================================= */
function initStickyFooter() {
  var footer = document.querySelector('.lp-sticky-footer');
  if (!footer) return;

  var hero = document.querySelector('.hero-split');
  if (!hero) return;

  var heroVisible = true;
  var lastScrollY = window.scrollY;

  /* ---------- Hero Visibility (much later hide) ---------- */
  if ('IntersectionObserver' in window) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          heroVisible = entry.isIntersecting;

          // Hero wieder klar präsent → Footer aus
          if (heroVisible) {
            footer.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.45,                  // Hero muss wirklich präsent sein
        rootMargin: '160px 0px 0px 0px'   // deutlich später ausblenden
      }
    );

    heroObserver.observe(hero);
  }

  /* ---------- Scroll Direction (much earlier show) ---------- */
  function onScroll() {
    var currentY = window.scrollY;

    // Scroll nach unten UND Hero weitgehend „verlassen“ → Footer zeigen
    if (currentY > lastScrollY && !heroVisible) {
      footer.classList.add('is-visible');
    }

    lastScrollY = currentY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* =========================================================
   LP Creator – teaser-2col @carousel
   Content-Slider Initialisierung + Pagination Sync
   ========================================================= */

(function () {
  if (!window.jQuery) return;

  var ARROW_SVG_URL =
    "https://www.immobilienscout24.de/content/dam/claude-lp-creator/assets/s24_arrow_left_24.svg";

  function hasContentSlider() {
    return !!(jQuery.fn && typeof jQuery.fn.contentSlider === "function");
  }

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */

  function readTranslateX(el) {
    var t = window.getComputedStyle(el).transform;
    if (!t || t === "none") return 0;
    var m = t.match(/matrix\(([^)]+)\)/);
    if (!m) return 0;
    var parts = m[1].split(",").map(function (p) {
      return parseFloat(p.trim());
    });
    return parts.length >= 6 ? parts[4] : 0;
  }

  function getActiveIndex($wrapper) {
    var ul = $wrapper.find(".content-slider-viewable-area > ul").get(0);
    if (!ul) return 0;

    var $pages = jQuery(ul).children(".content-slider-page");
    if (!$pages.length) return 0;

    var pageW = $pages.get(0).getBoundingClientRect().width || 1;

    var ml = parseFloat(window.getComputedStyle(ul).marginLeft) || 0;
    var tx = readTranslateX(ul) || 0;
    var offset = ml !== 0 ? ml : tx;

    var idx = Math.round(Math.abs(offset) / pageW);
    return Math.max(0, Math.min(idx, $pages.length - 1));
  }

  function applyActiveDot($wrapper) {
    var idx = getActiveIndex($wrapper);
    var $dots = $wrapper.find(".content-slider-page-trigger");
    $dots.removeClass("active");
    $dots.eq(idx).addClass("active");
  }

  function scheduleDotSync($wrapper) {
    applyActiveDot($wrapper);
    setTimeout(function () {
      applyActiveDot($wrapper);
    }, 120);
    setTimeout(function () {
      applyActiveDot($wrapper);
    }, 320);
    setTimeout(function () {
      applyActiveDot($wrapper);
    }, 520);
  }

  function wireDotSync($wrapper) {
    if ($wrapper.data("carouselDotSync")) return;
    $wrapper.data("carouselDotSync", true);

    $wrapper.on(
      "click",
      ".es-nav-prev, .es-nav-next, .content-slider-page-trigger",
      function () {
        scheduleDotSync($wrapper);
      }
    );

    $wrapper.on(
      "mouseup touchend pointerup",
      ".content-slider-viewable-area",
      function () {
        scheduleDotSync($wrapper);
      }
    );

    window.addEventListener("resize", function () {
      scheduleDotSync($wrapper);
    });

    scheduleDotSync($wrapper);
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */

  function initCarousel($slider) {
    if ($slider.data("carouselInit")) return;
    if (!hasContentSlider()) return;

    $slider.data("carouselInit", true);

    var prevTpl =
      '<div class="es-nav-prev" aria-label="Zurück">' +
      '<img src="' +
      ARROW_SVG_URL +
      '" alt="" width="24" height="24" />' +
      "</div>";

    var nextTpl =
      '<div class="es-nav-next" aria-label="Weiter">' +
      '<img src="' +
      ARROW_SVG_URL +
      '" alt="" width="24" height="24" style="transform:rotate(180deg)" />' +
      "</div>";

    $slider.find(".content-slider-viewable-area").contentSlider({
      step: 0,
      navButtonPrev: prevTpl,
      navButtonNext: nextTpl
    });

    wireDotSync($slider);
  }

  function boot() {
    jQuery('.content-slider[data-carousel="teaser-2col"]').each(function () {
      initCarousel(jQuery(this));
    });
  }

  if (document.readyState === "complete") {
    boot();
  } else {
    window.addEventListener("load", boot);
  }
})();




  /* =========================================
     INIT ALL INTERACTIONS
     ========================================= */
  onReady(function () {
    initCounterAnimated();
    initAccordion();
    initStickyFooter();
  });

})();
