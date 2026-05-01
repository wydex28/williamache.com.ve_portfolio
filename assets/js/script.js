// Silenciar advertencias de CDN/Play en consola antes de que ocurran
(function() {
  const originalWarn = console.warn;
  console.warn = function(...args) {
    if (args[0] && typeof args[0] === 'string' && (args[0].includes('cdn.tailwindcss.com') || args[0].includes('Tailwind CSS in production'))) return;
    originalWarn.apply(console, args);
  };
})();

$(function () {
  // Preloader Logic
  const $preloader = $('#preloader');
  $(window).on('load', function() {
    setTimeout(() => {
      $preloader.addClass('opacity-0');
      setTimeout(() => $preloader.remove(), 500);
    }, 500);
  });

  // Scrolling Title Logic
  let docTitle = document.title + "          ";
  setInterval(() => {
    docTitle = docTitle.substring(1) + docTitle.substring(0, 1);
    document.title = docTitle;
  }, 100);

  /** =====================
   *  Cursor Customization
   ====================== */
  const $cursorGlow = $('#cursor-glow');
  const $cursorDot = $('#cursor-dot');
  const $clickRipple = $('#click-ripple');

  $(document).on('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    // Suavizado del brillo
    $cursorGlow.css({
      'left': x + 'px',
      'top': y + 'px'
    });
    
    $cursorDot.css({
      'left': x + 'px',
      'top': y + 'px'
    });
  });

  // Animación de Click & Ripple
  $(document).on('mousedown', function(e) {
    $cursorDot.addClass('cursor-click');
    
    // Ripple Effect
    const x = e.clientX;
    const y = e.clientY;
    
    $clickRipple.css({
      'left': x + 'px',
      'top': y + 'px',
      'display': 'block'
    }).removeClass('ripple-anim');
    
    void $clickRipple[0].offsetWidth; // Reset animation
    $clickRipple.addClass('ripple-anim');
  }).on('mouseup', function() {
    $cursorDot.removeClass('cursor-click');
  });

  // Modos del Cursor (Hover)
  $(document).on('mouseenter', 'a, button, .nav-link, .cursor-pointer', function() {
    $cursorGlow.addClass('pointer-mode');
  }).on('mouseleave', 'a, button, .nav-link, .cursor-pointer', function() {
    $cursorGlow.removeClass('pointer-mode');
  });

  $(document).on('mouseenter', 'p, span, h1, h2, h3, h4, h5, h6, input, textarea, [data-translate]', function(e) {
    if ($(this).closest('a, button, .nav-link, .cursor-pointer').length) return;
    $cursorGlow.addClass('text-mode');
  }).on('mouseleave', 'p, span, h1, h2, h3, h4, h5, h6, input, textarea, [data-translate]', function() {
    $cursorGlow.removeClass('text-mode');
  });

  // reCAPTCHA v3 Logic
  const RECAPTCHA_SITE_KEY = '6Lc6C9QsAAAAANL3GCqm_WXw0BjaTQVcHXkKr2I0';

  // Formulario de Contacto
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    const $form = $(this);
    
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(function() {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then(function(token) {
          $('#g-recaptcha-response').val(token);
          $form[0].submit(); 
        });
      });
    } else {
      $form[0].submit();
    }
  });

  // Descarga de CV con validación invisible
  $(document).on('click', '#cv-menu a', function(e) {
    e.preventDefault();
    const downloadUrl = $(this).attr('href');
    
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(function() {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'download_cv'}).then(function(token) {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      });
    } else {
      window.open(downloadUrl, '_blank');
    }
  });

  /** =====================
   *  Deep Parallax Logic
   ====================== */
  const $parallaxItems = $('.parallax-item');
  $(window).on('scroll', function() {
    const scrolled = $(this).scrollTop();
    $parallaxItems.each(function() {
      const speed = $(this).data('speed') || 0.1;
      const yPos = -(scrolled * speed);
      $(this).css({
        'transform': `translateY(${yPos}px)`,
        'transition': 'transform 0.1s ease-out'
      });
    });
  });
});
