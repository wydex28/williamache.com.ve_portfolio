$(function () {
  // Preloader Logic
  const $preloader = $('#preloader');
  $(window).on('load', function() {
    setTimeout(() => {
      $preloader.addClass('opacity-0');
      setTimeout(() => {
        $preloader.addClass('invisible');
      }, 700);
    }, 2000); 
  });

  // Back to Top Logic
  const $backToTop = $('#back-to-top');
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 400) {
      $backToTop.removeClass('invisible opacity-0 translate-y-4').addClass('visible opacity-100 translate-y-0');
    } else {
      $backToTop.addClass('opacity-0 translate-y-4').removeClass('opacity-100 translate-y-0');
      setTimeout(() => { 
        if ($backToTop.hasClass('opacity-0')) $backToTop.addClass('invisible'); 
      }, 300);
    }
  });

  $backToTop.on('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Global Accessibility State
  let isNormalContrast = false; // High contrast is default
  let colorBlindMode = 0;
  const colorBlindFilters = ['', 'url(#daltonismo-rg)', 'url(#daltonismo-by)', 'grayscale(100%)'];

  function updateHtmlFilter() {
    let filterString = '';
    if (!isNormalContrast) filterString += 'contrast(130%) saturate(130%) brightness(90%) ';
    if (colorBlindMode > 0) filterString += colorBlindFilters[colorBlindMode];
    $('html').css('filter', filterString.trim() || 'none');
  }

  function syncContrastUI() {
    const $btn = $('#contrast-toggle');
    const $icon = $btn.find('i');
    if (isNormalContrast) {
        $btn.addClass('bg-dracula-yellow text-dracula-bg').removeClass('text-dracula-yellow bg-dracula-card');
        $icon.removeClass('bi-circle-half').addClass('bi-circle-fill');
    } else {
        $btn.removeClass('bg-dracula-yellow text-dracula-bg').addClass('text-dracula-yellow bg-dracula-card');
        $icon.removeClass('bi-circle-fill').addClass('bi-circle-half');
    }
  }

  /** =====================
     *  Navigation System
     ====================== */
  $(".nav-link").on("click", function () {
    const target = $(this).data("target");

    // Update Navbar visually
    $(".nav-link")
      .removeClass("active text-dracula-fg")
      .addClass("text-dracula-fg/60");

    $(this)
      .addClass("active text-dracula-fg")
      .removeClass("text-dracula-fg/60");

    // Toggle Sections with smooth transition
    $(".section-page").removeClass("active");
    $("#" + target).addClass("active");

    // Scroll slightly to top on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({
        top: $(".glass.rounded-3xl").last().offset().top - 20,
        behavior: "smooth",
      });
    }
  });

  /** =====================
     *  Avatar Image Cycler
     ====================== */
  const imagenes = [];
  for (let i = 1; i <= 24; i++) {
    imagenes.push(`./assets/images/profile/${i}.png`);
  }

  let index = 0;
  const $avatar = $("#avatar");
  const $bubble = $("#avatar-bubble");

  setTimeout(() => {
    $bubble.addClass("show");
  }, 1000);

  $("#avatar-container").on("click", function () {
    index = (index + 1) % imagenes.length;

    $avatar.css("transform", "scale(0.95)");
    setTimeout(() => {
      $avatar.attr("src", imagenes[index]);
      $avatar.css("transform", "scale(1)");
    }, 150);

    $bubble.removeClass("show");
  });

  setTimeout(() => {
    if ($bubble.hasClass("show")) {
      $bubble.removeClass("show");
    }
  }, 8000);

  /** =====================
     *  Portfolio Filter
     ====================== */
  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");

    $(".filter-btn")
      .removeClass(
        "active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20",
      )
      .addClass(
        "bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50",
      )
      .css("border", "");

    $(this)
      .addClass(
        "active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20",
      )
      .removeClass(
        "bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50",
      );

    if (filter === "all") {
      $(".portfolio-item").fadeIn(400);
    } else {
      $(".portfolio-item").hide();
      $(`.portfolio-item[data-category="${filter}"]`).fadeIn(400);
    }
  });

  /** =====================
     *  Skills Filter
     ====================== */
  $(".skill-filter-btn").on("click", function () {
    const filter = $(this).data("filter");

    $(".skill-filter-btn")
      .removeClass(
        "active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20",
      )
      .addClass(
        "bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50",
      )
      .css("border", "");

    $(this)
      .addClass(
        "active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20",
      )
      .removeClass(
        "bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50",
      );

    if (filter === "all") {
      $(".skill-item").fadeIn(400);
    } else {
      $(".skill-item").hide();
      $(`.skill-item[data-category="${filter}"]`).fadeIn(400);
    }
  });

  /** =====================
     *  Contact Data Decoder
     ====================== */
  const rawEmail = "d2lsbGlhbTI4YWNoZUBnbWFpbC5jb20=";
  const rawPhone = "KzU4NDEyMTMwNTQyMA==";

  $("#contact-li-email").on("click", function (e) {
    const $link = $("#contact-email");
    const mail = atob(rawEmail);
    if ($link.data("revealed")) {
      window.location.href = `mailto:${mail}`;
    } else {
      $link.text(mail);
      $link.data("revealed", true);
      $link.removeAttr("data-translate");
    }
  });

  $("#contact-li-phone").on("click", function (e) {
    const $link = $("#contact-phone");
    const phone = atob(rawPhone);
    if ($link.data("revealed")) {
      window.location.href = `tel:${phone}`;
    } else {
      $link.text("+58 (412) 130 5420");
      $link.data("revealed", true);
      $link.removeAttr("data-translate");
    }
  });

  $("#contact-li-location").on("click", function () {
    window.open(
      "https://www.google.com/maps/place/Aragua,+Venezuela/",
      "_blank",
    );
  });

  /** =====================
     *  Contact Form AJAX
     ====================== */
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    const $form = $(this);
    const $btn = $form.find('button[type="submit"]');
    const $btnSpan = $btn.find("span");
    const originalText = $btnSpan.text();

    $btn.prop("disabled", true).addClass("opacity-70 cursor-not-allowed");
    $btnSpan.text(currentLang === "es" ? "Enviando..." : "Sending...");

    $.ajax({
      url: $form.attr("action"),
      method: "POST",
      data: $form.serialize(),
      dataType: "json",
      success: function () {
        $btnSpan.text(
          currentLang === "es" ? "¡Mensaje Enviado!" : "Message Sent!",
        );
        $btn
          .removeClass("from-dracula-purple to-dracula-pink")
          .addClass("bg-dracula-green text-dracula-bg");
        $form[0].reset();
        setTimeout(() => {
          $btn
            .prop("disabled", false)
            .removeClass(
              "opacity-70 cursor-not-allowed bg-dracula-green text-dracula-bg",
            )
            .addClass("from-dracula-purple to-dracula-pink");
          $btnSpan.text(translations[currentLang]["Enviar Mensaje"]);
        }, 5000);
      },
      error: function () {
        $btnSpan.text(
          currentLang === "es" ? "Error al enviar" : "Error sending",
        );
        $btn
          .removeClass("from-dracula-purple to-dracula-pink")
          .addClass("bg-dracula-red text-dracula-fg");
        setTimeout(() => {
          $btn
            .prop("disabled", false)
            .removeClass(
              "opacity-70 cursor-not-allowed bg-dracula-red text-dracula-fg",
            )
            .addClass("from-dracula-purple to-dracula-pink");
          $btnSpan.text(translations[currentLang]["Enviar Mensaje"]);
        }, 3000);
      },
    });
  });

  /** =====================
     *  Theme Toggle System
     ====================== */
  const $themeBtn = $("#theme-toggle");
  const $themeIcon = $("#theme-toggle-icon");
  const $body = $("body");

  $themeBtn.on("click", function () {
    $themeBtn.toggleClass("active");
    $body.toggleClass("light-theme");

    if ($themeBtn.hasClass("active")) {
      $themeIcon
        .removeClass("bi-moon-stars-fill text-dracula-bg")
        .addClass("bi-sun-fill text-dracula-fg");
      localStorage.setItem("theme", "light");
      
      // Al activar modo claro, forzamos Alto Contraste para legibilidad
      isNormalContrast = false; 
      syncContrastUI();
      updateHtmlFilter();
    } else {
      $themeIcon
        .removeClass("bi-sun-fill text-dracula-fg")
        .addClass("bi-moon-stars-fill text-dracula-bg");
      localStorage.setItem("theme", "dark");
    }
  });

  // Persistence Check
  if (localStorage.getItem("theme") === "light") {
    $themeBtn.addClass("active");
    $body.addClass("light-theme");
    $themeIcon
      .removeClass("bi-moon-stars-fill text-dracula-bg")
      .addClass("bi-sun-fill text-dracula-fg");
  }

  /** =====================
     *  CV Menu Logic
     ====================== */
  const $cvBtn = $("#cv-btn-trigger");
  const $cvMenu = $("#cv-menu");

  $cvBtn.on("click", function (e) {
    e.stopPropagation();
    $cvMenu.toggleClass(
      "opacity-0 invisible translate-y-3 opacity-100 visible translate-y-0",
    );
  });

  $(document).on("click", function () {
    $cvMenu
      .addClass("opacity-0 invisible translate-y-3")
      .removeClass("opacity-100 visible translate-y-0");
  });

  $cvMenu.on("click", "a", function () {
    $cvMenu
      .addClass("opacity-0 invisible translate-y-3")
      .removeClass("opacity-100 visible translate-y-0");
  });

  /** =====================
     *  Dynamic Years Calc
     ====================== */
  function updateDynamicYears() {
    $("[data-years-from]").each(function () {
      const startDateStr = $(this).data("years-from");
      const startDate = new Date(startDateStr);

      if (isNaN(startDate.getTime())) return; // Skip if invalid

      const today = new Date();
      let years = today.getFullYear() - startDate.getFullYear();
      const monthDiff = today.getMonth() - startDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < startDate.getDate())
      ) {
        years--;
      }

      const suffix = currentLang === "es" ? "años" : "years";
      const prefix = $(this).text().startsWith("+") ? "+" : "";
      $(this).text(`${prefix}${years} ${suffix}`);
    });

    // Special case for sidebar title in lang.js
    const careerStart = new Date("2018-01-01");
    const today = new Date();
    let totalYears = today.getFullYear() - careerStart.getFullYear();
    if (today.getMonth() < careerStart.getMonth()) totalYears--;

    translations.es["Desarrollador Web"] =
      `Desarrollador Full-Stack • +${totalYears} Años`;
    translations.en["Desarrollador Web"] =
      `Full-Stack Developer • +${totalYears} Years`;

    // Refresh sidebar text if it's already rendered
    const $sidebarTitle = $('[data-translate="Desarrollador Web"]');
    if ($sidebarTitle.length) {
      $sidebarTitle.text(translations[currentLang]["Desarrollador Web"]);
    }
  }

  // Initial call
  updateDynamicYears();

  // Re-run on language change to update suffixes
  $(".language-link").on("click", function () {
    setTimeout(updateDynamicYears, 50); // Small delay to let lang.js update currentLang
  });

  /** =====================
     *  Certificates Filter
     ====================== */
  $(".cert-filter-btn").on("click", function () {
    $(".cert-filter-btn")
      .removeClass("active bg-dracula-purple text-dracula-bg")
      .addClass(
        "bg-dracula-card/80 text-dracula-fg/70 border-dracula-comment/50",
      );
    $(this)
      .addClass("active bg-dracula-purple text-dracula-bg")
      .removeClass(
        "bg-dracula-card/80 text-dracula-fg/70 border-dracula-comment/50",
      );

    const filter = $(this).data("filter");
    const $items = $(".cert-item");

    if (filter === "all") {
      $items.fadeIn(400);
    } else {
      $items.hide();
      $items.filter(`[data-category="${filter}"]`).fadeIn(400);
    }
  });

  /** =====================
     *  Voice Accessibility System
     ====================== */
  const $voiceBtn = $("#voice-toggle");
  const $voiceIcon = $("#voice-toggle-icon");
  let voiceEnabled = false;

  $voiceBtn.on("click", function () {
    voiceEnabled = !voiceEnabled;
    $(this).toggleClass("active");

    if (voiceEnabled) {
      $voiceIcon
        .removeClass("bi-volume-mute-fill")
        .addClass("bi-volume-up-fill");
      const welcome =
        currentLang === "es"
          ? "Accesibilidad por voz activada"
          : "Voice accessibility enabled";
      speak(welcome);
    } else {
      $voiceIcon
        .removeClass("bi-volume-up-fill")
        .addClass("bi-volume-mute-fill");
      window.speechSynthesis.cancel();
    }
  });

  function speak(text) {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop current

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === "es" ? "es-ES" : "en-US";
    utterance.rate = 1.0;

    // Find best voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) =>
      v.lang.startsWith(utterance.lang.split("-")[0]),
    );
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }

  // Attach hover events to important elements
  $(document).on(
    "mouseenter",
    "h1, h2, h3, h4, p, span, li, label, .nav-link, button, a, .skill-item, .portfolio-item, .cert-item",
    function (e) {
      if (!voiceEnabled) return;

      // Stop propagation to prevent multiple triggers for nested elements
      e.stopPropagation();

      const $el = $(this);
      let text = "";

      if ($el.hasClass("nav-link")) {
        text =
          (currentLang === "es" ? "Sección " : "Section ") +
          $el.text().replace(/\s+/g, " ").trim();
      } else if ($el.hasClass("skill-item")) {
        text = $el.find("h4").text().replace(/\s+/g, " ").trim();
      } else if ($el.hasClass("portfolio-item") || $el.hasClass("cert-item")) {
        text = $el.find("h3").text().replace(/\s+/g, " ").trim();
      } else {
        // Get all text and clean up whitespace/newlines, fallback to aria-label or title
        text =
          $el.text().replace(/\s+/g, " ").trim() ||
          $el.attr("aria-label") ||
          $el.attr("title") ||
          "";
      }

      if (text && text.length > 0 && text.length < 800) {
        // Allow longer text but avoid reading the whole page by accident
        speak(text);
      }
    },
  );

  /** =====================
     *  Floating A11y Menu & Zoom
     ====================== */
  const $a11yFab = $("#a11y-fab");
  const $a11yMenu = $("#a11y-menu");
  const $zoomToggle = $("#zoom-toggle");
  let zoomStep = 1;
  const zoomScales = { 1: 100, 2: 115, 3: 130 };
  const $zoomLevelText = $("#zoom-level-text");

  // Toggle menu
  $a11yFab.on("click", function (e) {
    e.stopPropagation();
    $a11yMenu.toggleClass(
      "opacity-0 invisible translate-y-4 opacity-100 visible translate-y-0",
    );
  });

  // Close menu when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".fixed.bottom-6.right-6").length) {
      $a11yMenu
        .removeClass("opacity-100 visible translate-y-0")
        .addClass("opacity-0 invisible translate-y-4");
    }
  });

  // Zoom Toggle (Font Size Scaling X1, X2, X3)
  $zoomToggle.on("click", function (e) {
    e.stopPropagation();

    zoomStep++;
    if (zoomStep > 3) zoomStep = 1;

    const scale = zoomScales[zoomStep];
    $("html").css("font-size", scale + "%");
    $zoomLevelText.text("X" + zoomStep);

    if (zoomStep > 1) {
      $(this)
        .addClass("bg-dracula-cyan text-dracula-bg")
        .removeClass("text-dracula-cyan bg-dracula-card");
      $(this).find("i").removeClass("bi-zoom-in").addClass("bi-zoom-out");
      if (voiceEnabled) {
        const msg =
          currentLang === "es"
            ? `Aumento nivel ${zoomStep}`
            : `Zoom level ${zoomStep}`;
        speak(msg);
      }
    } else {
      $(this)
        .removeClass("bg-dracula-cyan text-dracula-bg")
        .addClass("text-dracula-cyan bg-dracula-card");
      $(this).find("i").removeClass("bi-zoom-out").addClass("bi-zoom-in");
      if (voiceEnabled) {
        speak(currentLang === "es" ? "Tamaño original restaurado" : "Original size restored");
      }
    }
  });

  // Accessibility Click Handlers
  updateHtmlFilter(); // Initial call

  $('#contrast-toggle').on('click', function(e) {
    e.stopPropagation();
    isNormalContrast = !isNormalContrast;
    updateHtmlFilter();
    syncContrastUI();
    
    if (isNormalContrast) {
        if (voiceEnabled) speak(currentLang === 'es' ? 'Contraste normal activado' : 'Normal contrast enabled');
    } else {
        if (voiceEnabled) speak(currentLang === 'es' ? 'Alto contraste restaurado' : 'High contrast restored');
    }
  });

  // Color Blindness Toggle
  // Color Blindness Toggle
  
  const $colorblindToggle = $('#colorblind-toggle');
  const $colorblindLevelText = $('#colorblind-level-text');
  
  $colorblindToggle.on('click', function(e) {
    e.stopPropagation();
    colorBlindMode = (colorBlindMode + 1) % 4;
    updateHtmlFilter();
    
    const modeName = currentLang === 'es' ? colorBlindNames[colorBlindMode] : colorBlindEnNames[colorBlindMode];
    $colorblindLevelText.text(colorBlindMode === 0 ? 'Off' : modeName.split('/')[0]); // Short text for button
    
    if (colorBlindMode > 0) {
        $(this).addClass('bg-dracula-pink text-dracula-bg').removeClass('text-dracula-pink bg-dracula-card');
        if (voiceEnabled) speak(currentLang === 'es' ? 'Filtro de daltonismo: ' + modeName : 'Color blindness filter: ' + modeName);
    } else {
        $(this).removeClass('bg-dracula-pink text-dracula-bg').addClass('text-dracula-pink bg-dracula-card');
        if (voiceEnabled) speak(currentLang === 'es' ? 'Filtros visuales desactivados' : 'Visual filters disabled');
    }
  });

  // Make interactive items accessible via Keyboard
  $('.cert-item, .portfolio-item').attr({
      'tabindex': '0',
      'role': 'button'
  }).on('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          $(this).trigger('click');
      }
  });

  /** =====================
     *  Certificates Modal Logic
     ====================== */
  const $certModal = $("#cert-modal");
  const $certModalWindow = $("#cert-modal-window");
  const $certModalContent = $("#cert-modal-content");
  const $certModalTitle = $("#cert-modal-title");
  const $certModalCategory = $("#cert-modal-category");
  const $certModalLink = $("#cert-modal-link");
  const $certModalDownload = $("#cert-modal-download");

  $(".cert-item").on("click", function () {
    const data = $(this).data();
    if (!data.src) return;

    $certModalTitle.text(data.title);
    $certModalCategory.text($(this).find("[data-translate]").first().text());
    $certModalLink.attr("href", data.link);
    $certModalDownload.attr("href", data.src);

    $certModalContent.empty();
    if (data.src.endsWith(".pdf")) {
      $certModalContent.html(
        `<iframe src="${data.src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH" class="w-full h-full border-none" scrolling="no"></iframe>`,
      );
    } else {
      $certModalContent.html(
        `<img src="${data.src}" alt="${data.title}" class="w-full h-full object-contain">`,
      );
    }

    $certModal
      .removeClass("invisible opacity-0")
      .addClass("visible opacity-100");
    setTimeout(() => {
      $certModalWindow.removeClass("translate-y-10").addClass("translate-y-0");
    }, 10);

    if (voiceEnabled)
      speak(
        (currentLang === "es"
          ? "Abriendo certificado: "
          : "Opening certificate: ") + data.title,
      );
  });

  $(".cert-modal-close").on("click", function () {
    $certModalWindow.addClass("translate-y-10").removeClass("translate-y-0");
    setTimeout(() => {
      $certModal
        .addClass("invisible opacity-0")
        .removeClass("visible opacity-100");
      $certModalContent.empty();
    }, 300);
  });
  /** =====================
   *  Inspiration Modal Logic
   ====================== */
  const inspirationSources = [
    { name: "Alpaca Tech", handle: "@alpacatech", url: "https://www.youtube.com/@alpacatech" },
    { name: "Ben Cord", handle: "@bencord", url: "https://www.youtube.com/@bencord" },
    { name: "BettaTech", handle: "@BettaTech", url: "https://www.youtube.com/@BettaTech" },
    { name: "CodersFree", handle: "@CodersFree", url: "https://www.youtube.com/@CodersFree" },
    { name: "Código Facilito", handle: "@codigofacilito", url: "https://www.youtube.com/@codigofacilito" },
    { name: "DominiCode", handle: "@DominiCode", url: "https://www.youtube.com/@DominiCode" },
    { name: "Fazt Code", handle: "@FaztCode", url: "https://www.youtube.com/@FaztCode" },
    { name: "Fazt Tech", handle: "@FaztTech", url: "https://www.youtube.com/@FaztTech" },
    { name: "Fernando Herrera", handle: "@fernando_her85", url: "https://www.youtube.com/@fernando_her85" },
    { name: "Gentleman Programming", handle: "@gentlemanprogramming", url: "https://www.youtube.com/@gentlemanprogramming" },
    { name: "Hixec", handle: "@Hixec", url: "https://www.youtube.com/@Hixec" },
    { name: "HolaMundo", handle: "@HolaMundoDev", url: "https://www.youtube.com/@HolaMundoDev" },
    { name: "Jose David", handle: "@jose-david", url: "https://www.youtube.com/@jose-david" },
    { name: "La Geekipedia de Ernesto", handle: "@LaGeekipediaDeErnesto", url: "https://www.youtube.com/@LaGeekipediaDeErnesto" },
    { name: "midudev", handle: "@midudev", url: "https://www.youtube.com/@midudev" },
    { name: "MoureDev", handle: "@mouredev", url: "https://www.youtube.com/@mouredev" },
    { name: "Píldoras Informáticas", handle: "@pildorasinformaticas", url: "https://www.youtube.com/@pildorasinformaticas" },
    { name: "Platzi", handle: "@Platzi", url: "https://www.youtube.com/@Platzi" },
    { name: "Programador X", handle: "@ProgramadorX", url: "https://www.youtube.com/@ProgramadorX" },
    { name: "SoyDalto", handle: "@soydalto", url: "https://www.youtube.com/@soydalto" },
    { name: "TodoCode", handle: "@TodoCode", url: "https://www.youtube.com/@TodoCode" },
    { name: "Valen Werle", handle: "@ValenWerle", url: "https://www.youtube.com/@ValenWerle" },
    { name: "Victor Robles", handle: "@victorroblesweb", url: "https://www.youtube.com/@victorroblesweb" },
    { name: "Vida Programador", handle: "@vidaprogramador", url: "https://www.youtube.com/@vidaprogramador" }
  ];

  const $inspirationModal = $("#inspiration-modal");
  const $inspirationModalWindow = $("#inspiration-modal-window");
  const $inspirationGrid = $("#inspiration-grid");

  function openInspirationModal() {
    $inspirationGrid.empty();
    inspirationSources.forEach(source => {
      const avatarUrl = source.isWeb 
        ? `https://unavatar.io/${source.handle}`
        : `https://unavatar.io/youtube/${source.handle.replace('@', '')}`;

      const card = `
        <a href="${source.url}" target="_blank" class="group/card relative overflow-hidden bg-dracula-card/20 border border-dracula-comment/20 rounded-2xl p-4 hover:border-dracula-purple/50 transition-all hover:-translate-y-1 shadow-lg">
          <div class="absolute inset-0 bg-gradient-to-br from-dracula-purple/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div class="flex items-center gap-4 relative z-10">
            <div class="w-14 h-14 rounded-xl bg-dracula-bg/50 overflow-hidden flex-shrink-0 border border-dracula-comment/10 group-hover/card:border-dracula-purple/30 transition-all">
              <img src="${avatarUrl}" 
                   alt="${source.name}" 
                   class="w-full h-full object-cover"
                   onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\'w-full h-full flex items-center justify-center text-dracula-fg/20\'><i class=\'bi ${source.isWeb ? 'bi-grid-fill' : 'bi-youtube'}\'></i></div>';">
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-dracula-fg group-hover/card:text-dracula-purple transition-colors truncate text-sm">${source.name}</h4>
              <p class="text-[9px] uppercase tracking-wider text-dracula-comment font-bold mt-0.5">
                ${source.isWeb ? 'Website' : 'YouTube Channel'}
              </p>
            </div>
          </div>
        </a>
      `;
      $inspirationGrid.append(card);
    });

    $inspirationModal.removeClass("invisible").addClass("opacity-100");
    $inspirationModalWindow.removeClass("translate-y-10").addClass("translate-y-0");
    $('body').css('overflow', 'hidden'); 
  }

  function closeInspirationModal() {
    $inspirationModal.removeClass("opacity-100").addClass("opacity-0");
    $inspirationModalWindow.removeClass("translate-y-0").addClass("translate-y-10");
    setTimeout(() => {
        $inspirationModal.addClass("invisible");
        $('body').css('overflow', ''); 
    }, 300);
  }

  $("#open-inspiration").on("click", openInspirationModal);
  $(".inspiration-modal-close").on("click", closeInspirationModal);

  /** =====================
   *  Dynamic Footer Stats
   ====================== */
  function updateDynamicStats() {
    // 1. Clocks
    function updateClocks() {
      const now = new Date();
      
      // My Time (VET - America/Caracas)
      const myTimeStr = now.toLocaleTimeString('en-US', { 
        timeZone: 'America/Caracas', 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      $('#my-time').text(myTimeStr);

      // Visitor Time (Local)
      const visitorTimeStr = now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      $('#visitor-time').text(visitorTimeStr);
    }
    setInterval(updateClocks, 1000);
    updateClocks();

    // 1.1 Visitor Location (Geolocation - Localhost Friendly)
    async function fetchVisitorLocation() {
      try {
        const response = await fetch('https://api.db-ip.com/v2/free/self');
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (data.countryCode) {
          const code = data.countryCode.toLowerCase();
          $('#visitor-flag').addClass(`fi-${code}`);
          $('#visitor-country').text(data.countryName);
        }
      } catch (e) {
        $('#visitor-country').text('Local');
      }
    }
    fetchVisitorLocation();

    // 2. Weather (Maracay, Aragua)
    async function fetchWeather() {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10.2351&longitude=-67.5911&current_weather=true');
        const data = await response.json();
        if (data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          $('#weather-temp').text(`${temp}°C`);
          
          let code = data.current_weather.weathercode;
          let icon = 'bi-sun-fill';
          if (code >= 1 && code <= 3) icon = 'bi-cloud-sun-fill';
          if (code >= 45 && code <= 48) icon = 'bi-cloud-fog2-fill';
          if (code >= 51 && code <= 67) icon = 'bi-cloud-drizzle-fill';
          if (code >= 71 && code <= 86) icon = 'bi-cloud-snow-fill';
          if (code >= 95) icon = 'bi-cloud-lightning-rain-fill';
          $('#weather-icon').attr('class', `bi ${icon} animate-pulse`);
        }
      } catch (e) {
        $('#weather-temp').text('28°C');
      }
    }
    fetchWeather();

    // 3. Bitcoin Price (Real-time Instant - CoinGecko)
    let lastBtcPrice = 0;
    async function fetchBtcPrice() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.bitcoin.usd;
        
        const $btcWidget = $('#btc-widget');
        const $btcPrice = $('#btc-price');
        const $btcChangeContainer = $('#btc-change-container');
        const $btcChange = $('#btc-change');
        const $btcIcon = $('#btc-icon');
        
        $btcPrice.text(`${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`);
        
        if (lastBtcPrice !== 0) {
          const diff = price - lastBtcPrice;
          const diffPercent = (diff / lastBtcPrice) * 100;
          const sign = diff >= 0 ? '+' : '';
          
          $btcChange.text(`${sign}${diff.toFixed(2)} (${sign}${diffPercent.toFixed(4)}%)`);
          
          if (diff > 0) {
            $btcChangeContainer.removeClass('text-dracula-comment text-dracula-red').addClass('text-dracula-green');
            $btcIcon.attr('class', 'bi bi-arrow-up');
            // Mini flash effect
            $btcWidget.addClass('ring-1 ring-dracula-green/30');
            setTimeout(() => $btcWidget.removeClass('ring-1 ring-dracula-green/30'), 2000);
          } else if (diff < 0) {
            $btcChangeContainer.removeClass('text-dracula-comment text-dracula-green').addClass('text-dracula-red');
            $btcIcon.attr('class', 'bi bi-arrow-down');
            // Mini flash effect
            $btcWidget.addClass('ring-1 ring-dracula-red/30');
            setTimeout(() => $btcWidget.removeClass('ring-1 ring-dracula-red/30'), 2000);
          }
        } else {
          $btcChange.text('Live Tracking...');
        }
        
        lastBtcPrice = price;
      } catch (e) {
        $('#btc-price').text('76,400.00 USD');
      }
    }
    fetchBtcPrice();
    setInterval(fetchBtcPrice, 10000); // 10 segundos para sentir el "vivo"

    // 4. Visitor Counter (Global - Official Domain)
    async function updateCounter() {
      try {
        // Usamos tu dominio real para que sea único en el mundo
        const response = await fetch('https://api.counterapi.dev/v1/williamache_com_ve/hits/increment');
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (data.count) {
          $('#visitor-count').text(data.count.toString().padStart(5, '0'));
        }
      } catch (e) {
        $('#visitor-count').text('02505');
      }
    }
    updateCounter();
  }

  updateDynamicStats();
});

