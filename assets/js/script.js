$(function () {
  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Global definitions for accessibility
  const colorBlindNames = [
    "Normal",
    "Protanopia (Rojo)",
    "Deuteranopia (Verde)",
    "Tritanopia (Azul)",
  ];
  const colorBlindEnNames = [
    "Normal",
    "Protanopia (Red)",
    "Deuteranopia (Green)",
    "Tritanopia (Blue)",
  ];

  // Preloader Logic
  const $preloader = $("#preloader");
  $(window).on("load", function () {
    setTimeout(() => {
      $preloader.addClass("opacity-0");
      setTimeout(() => {
        $preloader.addClass("invisible");
      }, 700);
    }, 2000);
  });

  // Avatar Switcher Logic
  let currentAvatarIndex = 1;
  const totalAvatars = 80;
  const $avatar = $("#avatar");
  const $avatarContainer = $("#avatar-container");
  const $avatarBubble = $("#avatar-bubble");

  $avatarContainer.on("click", function () {
    currentAvatarIndex++;
    if (currentAvatarIndex > totalAvatars) currentAvatarIndex = 1;

    // Check extension: 34 is png, others are webp
    const ext = currentAvatarIndex === 34 ? "png" : "webp";
    const newSrc = `./assets/images/profile/${currentAvatarIndex}.${ext}`;

    // Smooth and organic transition effect
    $avatar.css({
      opacity: "0.3",
      transform: "scale(0.8) rotate(-5deg)",
      filter: "blur(8px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    });

    const img = new Image();
    img.src = newSrc;
    img.onload = () => {
      $avatar.attr("src", newSrc);
      setTimeout(() => {
        $avatar.css({
          opacity: "1",
          transform: "scale(1) rotate(0deg)",
          filter: "blur(0px)",
          transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", // Elastic/Springy effect
        });
      }, 50);
    };

    // Hide bubble permanently on click
    $avatarBubble.removeClass("active");
  });

  // Show help bubble after 1.5s and keep it active
  setTimeout(() => {
    if (currentAvatarIndex === 1) {
      $avatarBubble.addClass("active");
    }
  }, 1500);

  // Back to Top Logic
  const $backToTop = $("#back-to-top");
  let isShattering = false;
  let shatterStartY = 0;

  $(window).on("scroll", function () {
    const currentScroll = $(this).scrollTop();

    // Normal visibility logic
    if (currentScroll > 400 && !isShattering) {
      $backToTop
        .removeClass("invisible opacity-0 translate-y-4")
        .addClass("visible opacity-100 translate-y-0");
    } else if (currentScroll <= 400 && !isShattering) {
      $backToTop
        .addClass("opacity-0 translate-y-4")
        .removeClass("opacity-100 translate-y-0");
      setTimeout(() => {
        if ($backToTop.hasClass("opacity-0")) $backToTop.addClass("invisible");
      }, 300);
    }

    // Shattering/Reassembling logic
    if (isShattering) {
      // progress goes from 1 (broken at start) to 0 (assembled at top)
      let progress = currentScroll / shatterStartY;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      $backToTop[0].style.setProperty("--shatter", progress);

      // Once it reaches top, hide it and remove shattering state
      if (currentScroll <= 10) {
        isShattering = false;
        $backToTop
          .removeClass("shattering")
          .addClass("opacity-0 translate-y-4 invisible")
          .removeClass("opacity-100 translate-y-0");
        $backToTop[0].style.removeProperty("--shatter");
      }
    }
  });

  $backToTop.on("click", function () {
    if (isShattering) return;
    isShattering = true;
    shatterStartY = $(window).scrollTop();

    $backToTop.addClass("shattering").css("pointer-events", "none");
    $backToTop[0].style.setProperty("--shatter", "1");

    void $backToTop[0].offsetWidth;

    lenis.scrollTo(0, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        $backToTop.css("pointer-events", "");
      },
    });
  });

  // Global Accessibility State
  let isNormalContrast = false; // High contrast is default
  let colorBlindMode = 0;
  const colorBlindFilters = [
    "",
    "url(#daltonismo-rg)",
    "url(#daltonismo-by)",
    "grayscale(100%)",
  ];

  function updateHtmlFilter() {
    let filterString = "";
    if (!isNormalContrast)
      filterString += "contrast(130%) saturate(130%) brightness(90%) ";
    if (colorBlindMode > 0) filterString += colorBlindFilters[colorBlindMode];
    $("html").css("filter", filterString.trim() || "none");
  }

  function syncContrastUI() {
    const $btn = $("#contrast-toggle");
    const $icon = $btn.find("i");
    if (isNormalContrast) {
      $btn
        .addClass("bg-dracula-yellow text-dracula-bg")
        .removeClass("text-dracula-yellow bg-dracula-card");
      $icon.removeClass("bi-circle-half").addClass("bi-circle-fill");
    } else {
      $btn
        .removeClass("bg-dracula-yellow text-dracula-bg")
        .addClass("text-dracula-yellow bg-dracula-card");
      $icon.removeClass("bi-circle-fill").addClass("bi-circle-half");
    }
  }

  // Initialize UI State
  syncContrastUI();
  updateHtmlFilter();

  // Title Marquee Effect
  function initTitleMarquee() {
    let titleText =
      "William Ache | Desarrollador Full-Stack | Laravel • PHP • JavaScript • React • MySQL | ";
    setInterval(() => {
      titleText = titleText.substring(1) + titleText.substring(0, 1);
      document.title = titleText;
    }, 250);
  }
  initTitleMarquee();

  // Pure Glass Mode Toggle
  $("#glass-mode-toggle").on("click", function () {
    $(this).toggleClass("active");
    $("body").toggleClass("pure-glass-mode");
  });

  /** =====================
     *  Navigation System
     ====================== */
  const $navIndicator = $("#nav-indicator");

  function updateNavIndicator($el, isInitial = false) {
    if (!$el || !$el.length) return;

    const width = $el.outerWidth();
    const height = $el.outerHeight();
    const left = $el.position().left;
    const top = $el.position().top;

    if (isInitial) {
      gsap.set($navIndicator, { width, height, left, top, opacity: 1 });
    } else {
      // "Loading" pulse effect while moving (Faster)
      gsap.to($navIndicator, {
        left: left,
        top: top,
        width: width,
        height: height,
        duration: 0.25,
        ease: "power2.out",
        opacity: 1,
        onStart: () => {
          // Faster pulse glow
          gsap.to($navIndicator, {
            boxShadow: "0 0 25px #bd93f9, inset 0 0 12px #bd93f9",
            duration: 0.1,
            repeat: 1,
            yoyo: true,
          });
        },
      });
    }
  }

  // Set initial position
  setTimeout(() => updateNavIndicator($(".nav-link.active"), true), 500);

  $(".nav-link").on("click", function () {
    const target = $(this).data("target");
    const $currentSection = $(".section-page.active");
    const $newSection = $("#" + target);

    if ($currentSection.attr("id") === target) return;

    // Update Indicator
    updateNavIndicator($(this));

    // Update Navbar visually
    $(".nav-link")
      .removeClass("active text-dracula-fg")
      .addClass("text-dracula-fg/60");

    $(this)
      .addClass("active text-dracula-fg")
      .removeClass("text-dracula-fg/60");

    // Desactivar temporalmente los links para evitar clics múltiples durante la animación
    $(".nav-link").css("pointer-events", "none");

    // Animate OUT current section elements
    gsap.to($currentSection.find("> *"), {
      y: -15,
      opacity: 0,
      stagger: 0.03,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        $currentSection.removeClass("active");

        // Prepare new section (reset positions before showing)
        gsap.set($newSection.find("> *"), { y: 20, opacity: 0 });
        $newSection.addClass("active");

        // Animate IN new section elements with stagger
        gsap.to($newSection.find("> *"), {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.4,
          ease: "power3.out",
          clearProps: "y,opacity",
          onComplete: () => {
            $(".nav-link").css("pointer-events", "");
          },
        });

        // Fix for Leaflet Map
        if (target === "contact" && window.mapAragua) {
          setTimeout(() => {
            window.mapAragua.invalidateSize();
          }, 150);
        }

        // Scroll slightly to top on mobile using Lenis
        if (window.innerWidth < 1024) {
          const scrollTarget = $(".glass.rounded-3xl").last()[0];
          lenis.scrollTo(scrollTarget, {
            offset: -20,
            duration: 1.2,
          });
        }

        // Trigger re-init of scroll reveals for the new section
        $(document).trigger("sectionChanged");
      },
    });
  });

  /** =====================
   *  3D Tilt Effect for Cards
   ====================== */
  $(document).on("mousemove", ".glass-card, .badge-neon-purple", function (e) {
    const $card = $(this);
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    $card.css({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "none",
      "z-index": "50",
    });
  });

  $(document).on("mouseleave", ".glass-card, .badge-neon-purple", function () {
    $(this).css({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
      "z-index": "",
    });
  });

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

      // Sincronizar con el botón de Contraste (activarlo en modo claro)
      isNormalContrast = true;
      syncContrastUI();
      updateHtmlFilter();
    } else {
      $themeIcon
        .removeClass("bi-sun-fill text-dracula-fg")
        .addClass("bi-moon-stars-fill text-dracula-bg");
      localStorage.setItem("theme", "dark");

      // Sincronizar con el botón de Contraste (desactivarlo en modo oscuro)
      isNormalContrast = false;
      syncContrastUI();
      updateHtmlFilter();
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
     *  Neon Mode Toggle System
     ====================== */
  const $neonBtn = $("#neon-toggle");
  const $neonIcon = $("#neon-toggle-icon");

  $neonBtn.on("click", function () {
    $neonBtn.toggleClass("active");
    $body.toggleClass("neon-off");

    if ($neonBtn.hasClass("active")) {
      $neonIcon
        .removeClass("bi-lightning-slash-fill")
        .addClass("bi-lightning-charge-fill");
      localStorage.setItem("neon", "on");
    } else {
      $neonIcon
        .removeClass("bi-lightning-charge-fill")
        .addClass("bi-lightning-slash-fill");
      localStorage.setItem("neon", "off");
    }
  });

  // Neon Persistence Check (Default ON)
  if (localStorage.getItem("neon") === "off") {
    $neonBtn.removeClass("active");
    $body.addClass("neon-off");
    $neonIcon
      .removeClass("bi-lightning-charge-fill")
      .addClass("bi-lightning-slash-fill");
  } else {
    $neonBtn.addClass("active");
    $body.removeClass("neon-off");
    $neonIcon.addClass("bi-lightning-charge-fill");
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
        speak(
          currentLang === "es"
            ? "Tamaño original restaurado"
            : "Original size restored",
        );
      }
    }
  });

  // Accessibility Click Handlers
  updateHtmlFilter(); // Initial call

  $("#contrast-toggle").on("click", function (e) {
    e.stopPropagation();
    isNormalContrast = !isNormalContrast;
    updateHtmlFilter();
    syncContrastUI();

    if (isNormalContrast) {
      if (voiceEnabled)
        speak(
          currentLang === "es"
            ? "Contraste normal activado"
            : "Normal contrast enabled",
        );
    } else {
      if (voiceEnabled)
        speak(
          currentLang === "es"
            ? "Alto contraste restaurado"
            : "High contrast restored",
        );
    }
  });

  // Color Blindness Toggle
  // Color Blindness Toggle

  const $colorblindToggle = $("#colorblind-toggle");
  const $colorblindLevelText = $("#colorblind-level-text");

  $colorblindToggle.on("click", function (e) {
    e.stopPropagation();
    colorBlindMode = (colorBlindMode + 1) % 4;
    updateHtmlFilter();

    const modeName =
      currentLang === "es"
        ? colorBlindNames[colorBlindMode]
        : colorBlindEnNames[colorBlindMode];
    $colorblindLevelText.text(
      colorBlindMode === 0 ? "Off" : modeName.split("/")[0],
    ); // Short text for button

    if (colorBlindMode > 0) {
      $(this)
        .addClass("bg-dracula-pink text-dracula-bg")
        .removeClass("text-dracula-pink bg-dracula-card");
      if (voiceEnabled)
        speak(
          currentLang === "es"
            ? "Filtro de daltonismo: " + modeName
            : "Color blindness filter: " + modeName,
        );
    } else {
      $(this)
        .removeClass("bg-dracula-pink text-dracula-bg")
        .addClass("text-dracula-pink bg-dracula-card");
      if (voiceEnabled)
        speak(
          currentLang === "es"
            ? "Filtros visuales desactivados"
            : "Visual filters disabled",
        );
    }
  });

  // Make interactive items accessible via Keyboard
  $(".cert-item, .portfolio-item")
    .attr({
      tabindex: "0",
      role: "button",
    })
    .on("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $(this).trigger("click");
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

    // Handle Tilt Sensor
    $("#cert-tilt-sensor")
      .removeClass("pointer-events-none")
      .addClass("pointer-events-auto opacity-0");
    $("#cert-tilt-sensor")
      .off("click")
      .on("click", function () {
        $(this).addClass("pointer-events-none opacity-0");
      });

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
    {
      name: "Alpaca Tech",
      handle: "@alpacatech",
      url: "https://www.youtube.com/@alpacatech",
    },
    {
      name: "Ben Cord",
      handle: "@bencord",
      url: "https://www.youtube.com/@bencord",
    },
    {
      name: "BettaTech",
      handle: "@BettaTech",
      url: "https://www.youtube.com/@BettaTech",
    },
    {
      name: "CodersFree",
      handle: "@CodersFree",
      url: "https://www.youtube.com/@CodersFree",
    },
    {
      name: "Código Facilito",
      handle: "@codigofacilito",
      url: "https://www.youtube.com/@codigofacilito",
    },
    {
      name: "DominiCode",
      handle: "@DominiCode",
      url: "https://www.youtube.com/@DominiCode",
    },
    {
      name: "Fazt Code",
      handle: "@FaztCode",
      url: "https://www.youtube.com/@FaztCode",
    },
    {
      name: "Fazt Tech",
      handle: "@FaztTech",
      url: "https://www.youtube.com/@FaztTech",
    },
    {
      name: "Fernando Herrera",
      handle: "@fernando_her85",
      url: "https://www.youtube.com/@fernando_her85",
    },
    {
      name: "Gentleman Programming",
      handle: "@gentlemanprogramming",
      url: "https://www.youtube.com/@gentlemanprogramming",
    },
    { name: "Hixec", handle: "@Hixec", url: "https://www.youtube.com/@Hixec" },
    {
      name: "HolaMundo",
      handle: "@HolaMundoDev",
      url: "https://www.youtube.com/@HolaMundoDev",
    },
    {
      name: "Jose David",
      handle: "@jose-david",
      url: "https://www.youtube.com/@jose-david",
    },
    {
      name: "La Geekipedia de Ernesto",
      handle: "@LaGeekipediaDeErnesto",
      url: "https://www.youtube.com/@LaGeekipediaDeErnesto",
    },
    {
      name: "midudev",
      handle: "@midudev",
      url: "https://www.youtube.com/@midudev",
    },
    {
      name: "MoureDev",
      handle: "@mouredev",
      url: "https://www.youtube.com/@mouredev",
    },
    {
      name: "Píldoras Informáticas",
      handle: "@pildorasinformaticas",
      url: "https://www.youtube.com/@pildorasinformaticas",
    },
    {
      name: "Platzi",
      handle: "@Platzi",
      url: "https://www.youtube.com/@Platzi",
    },
    {
      name: "Programador X",
      handle: "@ProgramadorX",
      url: "https://www.youtube.com/@ProgramadorX",
    },
    {
      name: "SoyDalto",
      handle: "@soydalto",
      url: "https://www.youtube.com/@soydalto",
    },
    {
      name: "TodoCode",
      handle: "@TodoCode",
      url: "https://www.youtube.com/@TodoCode",
    },
    {
      name: "Valen Werle",
      handle: "@ValenWerle",
      url: "https://www.youtube.com/@ValenWerle",
    },
    {
      name: "Victor Robles",
      handle: "@victorroblesweb",
      url: "https://www.youtube.com/@victorroblesweb",
    },
    {
      name: "Vida Programador",
      handle: "@vidaprogramador",
      url: "https://www.youtube.com/@vidaprogramador",
    },
  ];

  const $inspirationModal = $("#inspiration-modal");
  const $inspirationModalWindow = $("#inspiration-modal-window");
  const $inspirationGrid = $("#inspiration-grid");

  function openInspirationModal() {
    $inspirationGrid.empty();
    inspirationSources.forEach((source) => {
      const avatarUrl = source.isWeb
        ? `https://unavatar.io/${source.handle}`
        : `https://unavatar.io/youtube/${source.handle.replace("@", "")}`;

      const card = `
        <a href="${source.url}" target="_blank" class="group/card relative overflow-hidden bg-dracula-card/20 border border-dracula-comment/20 rounded-2xl p-4 hover:border-dracula-purple/50 transition-all hover:-translate-y-1 shadow-lg">
          <div class="absolute inset-0 bg-gradient-to-br from-dracula-purple/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div class="flex items-center gap-4 relative z-10">
            <div class="w-14 h-14 rounded-xl bg-dracula-bg/50 overflow-hidden flex-shrink-0 border border-dracula-comment/10 group-hover/card:border-dracula-purple/30 transition-all">
              <img src="${avatarUrl}" 
                   alt="${source.name}" 
                   class="w-full h-full object-cover"
                   onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\'w-full h-full flex items-center justify-center text-dracula-fg/20\'><i class=\'bi ${source.isWeb ? "bi-grid-fill" : "bi-youtube"}\'></i></div>';">
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-dracula-fg group-hover/card:text-dracula-purple transition-colors truncate text-sm">${source.name}</h4>
              <p class="text-[9px] uppercase tracking-wider text-dracula-comment font-bold mt-0.5">
                ${source.isWeb ? "Website" : "YouTube Channel"}
              </p>
            </div>
          </div>
        </a>
      `;
      $inspirationGrid.append(card);
    });

    $inspirationModal.removeClass("invisible").addClass("opacity-100");
    $inspirationModalWindow
      .removeClass("translate-y-10")
      .addClass("translate-y-0");
    $("body").css("overflow", "hidden");
  }

  function closeInspirationModal() {
    $inspirationModal.removeClass("opacity-100").addClass("opacity-0");
    $inspirationModalWindow
      .removeClass("translate-y-0")
      .addClass("translate-y-10");
    setTimeout(() => {
      $inspirationModal.addClass("invisible");
      $("body").css("overflow", "");
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
      const myTimeStr = now.toLocaleTimeString("en-US", {
        timeZone: "America/Caracas",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      $("#my-time").text(myTimeStr);

      // Visitor Time (Local)
      const visitorTimeStr = now.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      $("#visitor-time").text(visitorTimeStr);
    }
    setInterval(updateClocks, 1000);
    updateClocks();

    // 1.1 Visitor Location (Geolocation - Localhost Friendly)
    async function fetchVisitorLocation() {
      try {
        const response = await fetch("https://api.db-ip.com/v2/free/self");
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (data.countryCode) {
          const code = data.countryCode.toLowerCase();
          $("#visitor-flag").addClass(`fi-${code}`);
          $("#visitor-country").text(data.countryName);
        }
      } catch (e) {
        $("#visitor-country").text("Local");
      }
    }
    fetchVisitorLocation();

    // 2. Weather (Maracay, Aragua)
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.2351&longitude=-67.5911&current_weather=true",
        );
        const data = await response.json();
        if (data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          $("#weather-temp").text(`${temp}°C`);

          let code = data.current_weather.weathercode;
          let icon = "bi-sun-fill";
          if (code >= 1 && code <= 3) icon = "bi-cloud-sun-fill";
          if (code >= 45 && code <= 48) icon = "bi-cloud-fog2-fill";
          if (code >= 51 && code <= 67) icon = "bi-cloud-drizzle-fill";
          if (code >= 71 && code <= 86) icon = "bi-cloud-snow-fill";
          if (code >= 95) icon = "bi-cloud-lightning-rain-fill";
          $("#weather-icon").attr("class", `bi ${icon} animate-pulse`);
        }
      } catch (e) {
        $("#weather-temp").text("28°C");
      }
    }
    fetchWeather();

    // 3. Bitcoin Price (Real-time Instant - CoinGecko)
    let lastBtcPrice = 0;
    async function fetchBtcPrice() {
      const $btcIcon = $("#btc-icon");
      const $btcWidget = $("#btc-widget");

      // Indicador visual de que está consultando
      $btcIcon.addClass("animate-bounce text-dracula-yellow");
      setTimeout(() => $btcIcon.removeClass("animate-bounce"), 2000);

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
          {
            mode: "cors",
          },
        );
        if (!response.ok) throw new Error("API limit");
        const data = await response.json();
        const price = data.bitcoin.usd;

        const $btcPrice = $("#btc-price");
        const $btcChangeContainer = $("#btc-change-container");
        const $btcChange = $("#btc-change");

        $btcPrice.text(
          `${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
        );

        if (lastBtcPrice !== 0) {
          const diff = price - lastBtcPrice;
          if (diff !== 0) {
            const diffPercent = (diff / lastBtcPrice) * 100;
            const sign = diff >= 0 ? "+" : "";
            $btcChange.text(`${sign}${diffPercent.toFixed(4)}%`);

            if (diff > 0) {
              $btcChangeContainer
                .removeClass("text-dracula-comment text-dracula-red")
                .addClass("text-dracula-green");
              $btcIcon.attr(
                "class",
                "bi bi-caret-up-fill text-dracula-green animate-bounce",
              );
              $btcWidget.addClass("ring-1 ring-dracula-green/30");

              setTimeout(() => {
                $btcIcon.attr(
                  "class",
                  "bi bi-currency-bitcoin text-dracula-yellow text-sm",
                );
                $btcWidget.removeClass("ring-1 ring-dracula-green/30");
              }, 5000);
            } else {
              $btcChangeContainer
                .removeClass("text-dracula-comment text-dracula-green")
                .addClass("text-dracula-red");
              $btcIcon.attr(
                "class",
                "bi bi-caret-down-fill text-dracula-red animate-bounce",
              );
              $btcWidget.addClass("ring-1 ring-dracula-red/30");

              setTimeout(() => {
                $btcIcon.attr(
                  "class",
                  "bi bi-currency-bitcoin text-dracula-yellow text-sm",
                );
                $btcWidget.removeClass("ring-1 ring-dracula-red/30");
              }, 5000);
            }
          }
        } else {
          $btcChange.text("Live");
        }

        lastBtcPrice = price;
      } catch (e) {
        // Fallback silencioso si hay bloqueo de CORS o error de red
        if (lastBtcPrice === 0) {
          $("#btc-price").text("95,450.00 USD");
          $("#btc-change").text("Live");
        }
      }
    }
    fetchBtcPrice();
    setInterval(fetchBtcPrice, 60000); // 60s: Evitar error 429 (Too Many Requests)

    // 4. Visitor Counter (Hybrid Real System)
    function updateCounter() {
      // Base de visitas reales simulada con persistencia
      let baseVisits = 2540;
      let savedVisits = localStorage.getItem("portfolio_total_visits");

      if (!savedVisits) {
        savedVisits = baseVisits;
      } else {
        savedVisits = parseInt(savedVisits);
      }

      // Incrementar por sesión
      if (!sessionStorage.getItem("visit_counted")) {
        savedVisits += 1;
        sessionStorage.setItem("visit_counted", "true");
      }

      // Simular tráfico global (pequeño incremento aleatorio basado en el tiempo)
      const now = new Date();
      const globalFactor = Math.floor(
        (now.getTime() - 1714500000000) / 1000000,
      );
      const totalVisits = savedVisits + globalFactor;

      localStorage.setItem("portfolio_total_visits", savedVisits);
      $("#visitor-count").text(totalVisits.toString().padStart(5, "0"));
    }
    updateCounter();
    setInterval(updateCounter, 60000); // Actualizar cada minuto
  }

  updateDynamicStats();

  // Cursor Glow Effect
  const $cursorGlow = $("#cursor-glow");
  $(document).on("mousemove", function (e) {
    $cursorGlow.css({
      top: e.clientY + "px",
      left: e.clientX + "px",
      opacity: 1,
    });
  });

  $(document).on("mouseleave", function () {
    $cursorGlow.css("opacity", 0);
  });

  $(document).on("mousedown", function () {
    $cursorGlow.find(".cursor-ripple").removeClass("animate");
    void $cursorGlow.find(".cursor-ripple")[0].offsetWidth;
    $cursorGlow.find(".cursor-ripple").addClass("animate");
    $cursorGlow.css("transform", "translate(-50%, -50%) scale(0.85)");
  });

  $(document).on("mouseup", function () {
    $cursorGlow.css("transform", "translate(-50%, -50%) scale(1)");
  });

  // Cursor Hover Interactions
  $(document)
    .on(
      "mouseenter",
      "a, button, .cursor-pointer, .nav-link, .filter-btn, .skill-item, .skill-filter-btn",
      function () {
        $cursorGlow.removeClass("text-mode").addClass("pointer-mode");
      },
    )
    .on(
      "mouseleave",
      "a, button, .cursor-pointer, .nav-link, .filter-btn, .skill-item, .skill-filter-btn",
      function () {
        $cursorGlow.removeClass("pointer-mode");
      },
    );

  $(document)
    .on(
      "mouseenter",
      "p, span, h1, h2, h3, h4, h5, h6, input, textarea, [data-translate]",
      function (e) {
        // Si el texto está dentro de un botón o link, no activar modo texto
        if (
          $(this).closest(
            "a, button, .cursor-pointer, .nav-link, .filter-btn, .skill-item, .skill-filter-btn",
          ).length
        )
          return;
        $cursorGlow.removeClass("pointer-mode").addClass("text-mode");
      },
    )
    .on(
      "mouseleave",
      "p, span, h1, h2, h3, h4, h5, h6, input, textarea, [data-translate]",
      function () {
        $cursorGlow.removeClass("text-mode");
      },
    );

  // Skill Modal Logic
  const $skillModal = $("#skill-modal");
  const $skillModalCard = $skillModal.find(".relative");

  $(document).on("click", ".skill-item", function (e) {
    e.preventDefault();
    const $item = $(this);
    const title = $item.find("h4").text();
    const icon = $item.find("img").attr("src") || "";
    const category = $item.find("span[data-translate]").text();
    const experience =
      $item.data("experience") ||
      "He trabajado con esta tecnología en múltiples proyectos, asegurando implementaciones eficientes y escalables según los requerimientos del cliente.";
    const link = $item.attr("href");

    // Fill Modal
    $("#skill-modal-title").text(title);
    $("#skill-modal-icon").attr("src", icon);
    $("#skill-modal-category").text(category);
    $("#skill-modal-experience").text(experience);
    $("#skill-modal-link").attr("href", link);

    // Show Modal
    $skillModal.removeClass("invisible").addClass("opacity-100");
    $skillModalCard.removeClass("scale-95").addClass("scale-100");
    $("body").addClass("overflow-hidden"); // Prevent scroll
  });

  function closeSkillModal() {
    $skillModal.removeClass("opacity-100").addClass("opacity-0");
    $skillModalCard.removeClass("scale-100").addClass("scale-95");
    setTimeout(() => {
      $skillModal.addClass("invisible");
      $("body").removeClass("overflow-hidden");
    }, 300);
  }

  $(".skill-modal-close").on("click", closeSkillModal);
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && !$skillModal.hasClass("invisible"))
      closeSkillModal();
  });

  /** =====================
   *  Deep Parallax Logic
   ====================== */
  const $parallaxItems = $(".parallax-item");
  $(window).on("scroll", function () {
    const scrolled = $(this).scrollTop();
    $parallaxItems.each(function () {
      const speed = $(this).data("speed") || 0.1;
      const yPos = -(scrolled * speed);
      $(this).css({
        transform: `translateY(${yPos}px)`,
        transition: "transform 0.1s ease-out",
      });
    });
  });

  /** =====================
   *  System Startup Reveal (ScrollTrigger)
   ====================== */
  gsap.registerPlugin(ScrollTrigger);

  function initScrollReveals() {
    // Inject loaders if they don't exist
    $('.portfolio-item').each(function() {
        if ($(this).find('.software-loader').length === 0) {
            $(this).prepend(`
                <div class="software-loader absolute inset-0 flex flex-col items-center justify-center font-mono text-[9px] p-4 text-dracula-green z-50 pointer-events-none rounded-2xl" style="background: #282a36; opacity: 0; visibility: hidden;">
                    <div class="w-full max-w-[140px] glitch-infinite">
                        <div class="loader-line" style="width:0; overflow:hidden;" data-text="> BOOTING_SaaS_CORE..."></div>
                        <div class="loader-line" style="width:0; overflow:hidden;" data-text="> LOADING_DEPENDENCIES..."></div>
                        <div class="loader-line text-dracula-cyan" style="width:0; overflow:hidden;" data-text="> [OK] MODULE_READY"></div>
                    </div>
                </div>
            `);
        }
    });

    // Target common interactive elements
    const revealTargets = ".glass-card, .skill-item, .portfolio-item, .cert-item, .timeline-item, .section-page h2";
    
    gsap.utils.toArray(revealTargets).forEach((el) => {
      // Avoid re-animating if already visible
      if (gsap.getProperty(el, "opacity") > 0 && !$(el).closest('.section-page').hasClass('active')) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none"
        }
      });

      if ($(el).hasClass('portfolio-item')) {
          const loader = el.querySelector('.software-loader');
          const lines = loader.querySelectorAll('.loader-line');
          const content = el.querySelectorAll('.p-6, img, i, .h-48, .absolute:not(.software-loader)');

          tl.set(loader, { autoAlpha: 1 })
            .set(content, { opacity: 0 })
            .to(lines[0], { width: "100%", duration: 0.3, ease: "steps(20)", onStart: () => { lines[0].textContent = lines[0].dataset.text; lines[0].classList.add('active-caret'); } })
            .to(lines[1], { width: "100%", duration: 0.4, ease: "steps(25)", onStart: () => { lines[1].textContent = lines[1].dataset.text; lines[1].classList.add('active-caret'); } })
            .to(lines[2], { width: "100%", duration: 0.2, ease: "steps(15)", onStart: () => { lines[2].textContent = lines[2].dataset.text; lines[2].classList.add('active-caret'); } })
            .to(loader, { opacity: 0, scale: 1.05, duration: 0.3, ease: "power2.in", delay: 0.2, onComplete: () => { loader.style.display = 'none'; } })
            .to(content, { opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.1");
      } else {
          tl.fromTo(el, 
            { opacity: 0, y: 25, scale: 0.98, filter: "blur(10px) brightness(1.5)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px) brightness(1)", duration: 0.5, ease: "expo.out" }
          )
          .to(el, { opacity: 0.5, duration: 0.04 }, "-=0.3")
          .to(el, { opacity: 1, duration: 0.04 })
          .to(el, { opacity: 0.8, duration: 0.03 })
          .to(el, { opacity: 1, duration: 0.08 });
      }
    });
  }

  // Initial call after a short delay
  setTimeout(initScrollReveals, 800);

  // Re-run reveals when switching sections
  $(document).on("sectionChanged", () => {
    const activeId = $(".section-page.active").attr('id');
    
    // Specifically reset portfolio items when entering the portfolio section
    if (activeId === 'portfolio') {
        $('.portfolio-item').each(function() {
            const $item = $(this);
            const $loader = $item.find('.software-loader');
            const $content = $item.find('.p-6, img, i, .h-48, .absolute:not(.software-loader)');
            
            // Reset components state
            gsap.set($loader, { autoAlpha: 0, display: 'flex' });
            gsap.set($content, { opacity: 0 });
            $loader.find('.loader-line').css({ width: 0 }).text('').removeClass('active-caret');
            
            // Kill existing triggers for portfolio items to allow fresh ones
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === this) st.kill();
            });
        });
    }

    setTimeout(initScrollReveals, 100);
    if (activeId) updateScrollytelling(activeId);
  });

  /** =====================
   *  Virtual File System & Terminal Logic
   ====================== */
  const $footerStandard = $('#footer-standard-view');
  const $footerTerminal = $('#footer-terminal-view');
  const $terminalInput = $('#full-terminal-input');
  const $terminalOutput = $('#full-terminal-output');
  
  let currentPath = "/";
  const virtualFS = {
    "/": {
        "assets": { type: "dir" },
        "index.html": { type: "file", content: "<!-- William Ache Portfolio v2.4 -->\n<!DOCTYPE html>\n<html lang='es'>\n<head>..." },
        ".gitignore": { type: "file", content: "node_modules/\n.next/\n.env\n*.log" },
        "README.md": { type: "file", content: "# William Ache Portfolio\nImmersive Cyberpunk Experience built with GSAP & Vanilla JS." }
    },
    "/assets": {
        "css": { type: "dir" },
        "js": { type: "dir" },
        "images": { type: "dir" },
        "ideas.txt": { type: "file", content: "- Add Linux Terminal Easter Egg [DONE]\n- Improve Scrollytelling [DONE]\n- Fix Scroll Propagation [DONE]" }
    },
    "/assets/js": {
        "script.js": { type: "file", content: "/** Main Logic */\n$(document).ready(() => {\n  initPortfolio();\n});" },
        "lang.js": { type: "file", content: "const translations = {\n  es: { ... },\n  en: { ... }\n};" }
    },
    "/assets/css": {
        "style.css": { type: "file", content: ":root {\n  --dracula-bg: #282a36;\n  --dracula-purple: #bd93f9;\n}" }
    }
  };

  const terminalCommands = {
    help: () => `
      <div class="space-y-1 opacity-80">
        <p><span class="text-dracula-cyan">ls / dir</span> - List directory contents</p>
        <p><span class="text-dracula-cyan">cd [dir]</span> - Change directory</p>
        <p><span class="text-dracula-cyan">cat / nano / vi [file]</span> - Read file content</p>
        <p><span class="text-dracula-cyan">pwd</span> - Print working directory</p>
        <p><span class="text-dracula-cyan">history</span> - Show command history</p>
        <p><span class="text-dracula-cyan">clear</span> - Clear terminal screen</p>
        <p><span class="text-dracula-cyan">exit</span> - Close terminal</p>
      </div>`,
    pwd: () => `<p class="text-dracula-fg/60">${currentPath}</p>`,
    ls: () => {
        const items = virtualFS[currentPath];
        if (!items) return "Error: Path not found.";
        return `<div class="flex flex-wrap gap-x-6">` + 
            Object.keys(items).map(key => {
                const isDir = items[key].type === "dir";
                return `<span class="${isDir ? 'text-dracula-purple font-bold' : 'text-dracula-fg'}">${key}${isDir ? '/' : ''}</span>`;
            }).join('') + `</div>`;
    },
    dir: () => terminalCommands.ls(),
    cd: (args) => {
        const target = args[0];
        if (!target || target === "~") { currentPath = "/"; return ""; }
        if (target === "..") {
            if (currentPath === "/") return "";
            const parts = currentPath.split('/').filter(p => p);
            parts.pop();
            currentPath = "/" + parts.join('/');
            return "";
        }
        
        // Simple relative path support
        const normalizedTarget = currentPath === "/" ? `/${target}` : `${currentPath}/${target}`;
        if (virtualFS[normalizedTarget]) {
            currentPath = normalizedTarget;
            return "";
        } else {
            const items = virtualFS[currentPath];
            if (items && items[target] && items[target].type === "dir") {
                currentPath = normalizedTarget;
                return "";
            }
        }
        return `<span class="text-dracula-red">cd: no such directory: ${target}</span>`;
    },
    cat: (args) => {
        const file = args[0];
        if (!file) return "Usage: cat [filename]";
        const items = virtualFS[currentPath];
        if (items && items[file]) {
            if (items[file].type === "dir") return `cat: ${file}: Is a directory`;
            return `<pre class="text-dracula-comment whitespace-pre-wrap mt-2 p-2 bg-black/40 rounded border border-white/5">${items[file].content}</pre>`;
        }
        return `cat: ${file}: No such file`;
    },
    nano: (args) => terminalCommands.cat(args),
    vi: (args) => terminalCommands.cat(args),
    clear: () => { $terminalOutput.empty(); return ""; }
  };

  function toggleFullTerminal(show) {
    const btnRect = $('#open-terminal')[0].getBoundingClientRect();
    const footerRect = $('#footer-inner-wrapper')[0].getBoundingClientRect();
    const startX = btnRect.left - footerRect.left;
    const startY = btnRect.top - footerRect.top;
    const startW = btnRect.width;
    const startH = btnRect.height;

    const tl = gsap.timeline();

        if (show) {
            tl.to($footerStandard, { opacity: 0, duration: 0.1, scale: 0.97, ease: "power2.in" })
            .set($footerStandard, { display: 'none' })
            .set($footerTerminal, { 
                display: 'flex', 
                opacity: 1, 
                clipPath: `inset(${startY}px ${footerRect.width - (startX + startW)}px ${footerRect.height - (startY + startH)}px ${startX}px round 16px)`,
                backgroundColor: 'rgba(26, 26, 26, 0.4)'
            })
            .to($footerTerminal, { 
                clipPath: `inset(0px 0px 0px 0px round 24px)`,
                duration: 0.25,
                backgroundColor: 'rgba(13, 13, 13, 0.5)',
                ease: "power4.out"
            })
            .fromTo($('#footer-terminal-view > div'), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.15, stagger: 0.04, ease: "power2.out" })
            .call(() => $terminalInput.focus());

        } else {
            tl.to($('#footer-terminal-view > div'), { opacity: 0, y: 5, duration: 0.1 })
            .to($footerTerminal, { 
                clipPath: `inset(${startY}px ${footerRect.width - (startX + startW)}px ${footerRect.height - (startY + startH)}px ${startX}px round 16px)`,
                duration: 0.2,
                backgroundColor: 'rgba(26, 26, 26, 0.4)',
                ease: "power4.in"
            })
            .to($footerTerminal, { opacity: 0, duration: 0.1 })
            .set($footerTerminal, { display: 'none' })
            .set($footerStandard, { display: 'flex', opacity: 0, scale: 0.97 })
            .to($footerStandard, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
        }
    }

    $('#open-terminal').on('click', () => toggleFullTerminal(true));

    function updatePrompt() {
        const displayPath = currentPath === "/" ? "~" : `~${currentPath}`;
        $('#terminal-path-label').text(displayPath);
    }

    let commandHistory = [];

    $terminalInput.on('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const fullInput = $(this).val();
            const args = fullInput.split(' ');
            const lastArg = args[args.length - 1];
            
            if (lastArg) {
                const items = virtualFS[currentPath];
                if (items) {
                    const matches = Object.keys(items).filter(k => k.startsWith(lastArg));
                    if (matches.length === 1) {
                        args[args.length - 1] = matches[0];
                        $(this).val(args.join(' '));
                    }
                }
            }
        }

        if (e.key === 'Enter') {
            const fullInput = $(this).val().trim();
            if (!fullInput) return;
            
            // Add to history
            commandHistory.push(fullInput);
            
            const args = fullInput.split(' ');
            const cmd = args.shift().toLowerCase();
            const displayPath = currentPath === "/" ? "~" : `~${currentPath}`;

            $terminalOutput.append(`
                <div class="flex gap-1 font-bold">
                    <span class="text-dracula-cyan">william-ache@portfolio:</span>
                    <span class="text-dracula-purple">${displayPath}</span>
                    <span class="text-dracula-cyan">$</span>
                    <span class="text-dracula-fg ml-1">${fullInput}</span>
                </div>
            `);

            if (cmd === 'exit') {
                $terminalOutput.empty();
                toggleFullTerminal(false);
            } else if (cmd === 'history') {
                const historyList = commandHistory.map((c, i) => `<div>${i + 1}  ${c}</div>`).join('');
                const $resultEl = $(`<div class="mt-1 mb-2 ml-4 opacity-0 text-dracula-comment">${historyList}</div>`);
                $terminalOutput.append($resultEl);
                gsap.to($resultEl, { opacity: 1, y: -2, duration: 0.8, ease: "power2.inOut" });
            } else if (terminalCommands[cmd]) {
                const result = terminalCommands[cmd](args);
                if (result) {
                    const $resultEl = $(`<div class="mt-1 mb-2 ml-4 opacity-0">${result}</div>`);
                    $terminalOutput.append($resultEl);
                    gsap.to($resultEl, { opacity: 1, y: -2, duration: 0.8, ease: "power2.inOut" });
                }
                if (cmd === 'cd') updatePrompt();
            } else {
                const $errorEl = $(`<div class="text-dracula-red mb-2 ml-4 opacity-0">> Error: Command '${cmd}' unrecognized.</div>`);
                $terminalOutput.append($errorEl);
                gsap.to($errorEl, { opacity: 1, y: -2, duration: 0.8, ease: "power2.inOut" });
            }

        $(this).val('');
        $('#full-terminal-body').scrollTop($('#full-terminal-body')[0].scrollHeight);
    }
  });

  // Prevent scroll propagation to the main page
  $('#full-terminal-body').on('wheel mousewheel DOMMouseScroll', function(e) {
      e.stopPropagation();
  });

  // Keep focus on input when clicking anywhere in the terminal
  $footerTerminal.on('click', () => $terminalInput.focus());

  /** =====================
   *  Scrollytelling & Narrative Logic (Comentado por petición del usuario)
   ====================== */
  /* (Existing commented code...) */
});
