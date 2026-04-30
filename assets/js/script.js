$(function () {
    /** =====================
     *  Navigation System
     ====================== */
    $('.nav-link').on('click', function () {
        const target = $(this).data('target');
        
        // Update Navbar visually
        $('.nav-link')
            .removeClass('active text-dracula-fg')
            .addClass('text-dracula-fg/60');
            
        $(this)
            .addClass('active text-dracula-fg')
            .removeClass('text-dracula-fg/60');
            
        // Toggle Sections with smooth transition
        $('.section-page').removeClass('active');
        $('#' + target).addClass('active');
        
        // Scroll slightly to top on mobile
        if(window.innerWidth < 1024) {
            window.scrollTo({
                top: $('.glass.rounded-3xl').last().offset().top - 20,
                behavior: 'smooth'
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
    const $avatar = $('#avatar');
    const $bubble = $('#avatar-bubble');

    setTimeout(() => {
        $bubble.addClass('show');
    }, 1000);

    $('#avatar-container').on('click', function () {
        index = (index + 1) % imagenes.length;
        
        $avatar.css('transform', 'scale(0.95)');
        setTimeout(() => {
            $avatar.attr('src', imagenes[index]);
            $avatar.css('transform', 'scale(1)');
        }, 150);
        
        $bubble.removeClass('show');
    });

    setTimeout(() => {
        if ($bubble.hasClass('show')) {
            $bubble.removeClass('show');
        }
    }, 8000);

    /** =====================
     *  Portfolio Filter
     ====================== */
    $('.filter-btn').on('click', function () {
        const filter = $(this).data('filter');
        
        $('.filter-btn')
            .removeClass('active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20')
            .addClass('bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50')
            .css('border', '');
            
        $(this)
            .addClass('active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20')
            .removeClass('bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50');

        if (filter === 'all') {
            $('.portfolio-item').fadeIn(400);
        } else {
            $('.portfolio-item').hide();
            $(`.portfolio-item[data-category="${filter}"]`).fadeIn(400);
        }
    });

    /** =====================
     *  Skills Filter
     ====================== */
    $('.skill-filter-btn').on('click', function () {
        const filter = $(this).data('filter');
        
        $('.skill-filter-btn')
            .removeClass('active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20')
            .addClass('bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50')
            .css('border', '');
            
        $(this)
            .addClass('active bg-dracula-purple text-dracula-bg shadow-dracula-purple/20')
            .removeClass('bg-dracula-card/80 text-dracula-fg/70 border border-dracula-comment/50');

        if (filter === 'all') {
            $('.skill-item').fadeIn(400);
        } else {
            $('.skill-item').hide();
            $(`.skill-item[data-category="${filter}"]`).fadeIn(400);
        }
    });

    /** =====================
     *  Contact Data Decoder
     ====================== */
    const rawEmail = "d2lsbGlhbTI4YWNoZUBnbWFpbC5jb20=";
    const rawPhone = "KzU4NDEyMTMwNTQyMA==";

    $('#contact-li-email').on('click', function(e) {
        const $link = $('#contact-email');
        const mail = atob(rawEmail);
        if ($link.data('revealed')) {
            window.location.href = `mailto:${mail}`;
        } else {
            $link.text(mail);
            $link.data('revealed', true);
            $link.removeAttr('data-translate');
        }
    });

    $('#contact-li-phone').on('click', function(e) {
        const $link = $('#contact-phone');
        const phone = atob(rawPhone);
        if ($link.data('revealed')) {
            window.location.href = `tel:${phone}`;
        } else {
            $link.text("+58 (412) 130 5420");
            $link.data('revealed', true);
            $link.removeAttr('data-translate');
        }
    });

    $('#contact-li-location').on('click', function() {
        window.open('https://www.google.com/maps/place/Aragua,+Venezuela/', '_blank');
    });

    /** =====================
     *  Contact Form AJAX
     ====================== */
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        const $form = $(this);
        const $btn = $form.find('button[type="submit"]');
        const $btnSpan = $btn.find('span');
        const originalText = $btnSpan.text();
        
        $btn.prop('disabled', true).addClass('opacity-70 cursor-not-allowed');
        $btnSpan.text(currentLang === 'es' ? 'Enviando...' : 'Sending...');
        
        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            success: function() {
                $btnSpan.text(currentLang === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!');
                $btn.removeClass('from-dracula-purple to-dracula-pink').addClass('bg-dracula-green text-dracula-bg');
                $form[0].reset();
                setTimeout(() => {
                    $btn.prop('disabled', false).removeClass('opacity-70 cursor-not-allowed bg-dracula-green text-dracula-bg').addClass('from-dracula-purple to-dracula-pink');
                    $btnSpan.text(translations[currentLang]["Enviar Mensaje"]);
                }, 5000);
            },
            error: function() {
                $btnSpan.text(currentLang === 'es' ? 'Error al enviar' : 'Error sending');
                $btn.removeClass('from-dracula-purple to-dracula-pink').addClass('bg-dracula-red text-dracula-fg');
                setTimeout(() => {
                    $btn.prop('disabled', false).removeClass('opacity-70 cursor-not-allowed bg-dracula-red text-dracula-fg').addClass('from-dracula-purple to-dracula-pink');
                    $btnSpan.text(translations[currentLang]["Enviar Mensaje"]);
                }, 3000);
            }
        });
    });

    /** =====================
     *  Theme Toggle System
     ====================== */
    const $themeBtn = $('#theme-toggle');
    const $themeIcon = $('#theme-toggle-icon');
    const $body = $('body');

    $themeBtn.on('click', function() {
        $themeBtn.toggleClass('active');
        $body.toggleClass('light-theme');
        
        if ($themeBtn.hasClass('active')) {
            $themeIcon.removeClass('bi-moon-stars-fill text-dracula-bg').addClass('bi-sun-fill text-dracula-fg');
            localStorage.setItem('theme', 'light');
        } else {
            $themeIcon.removeClass('bi-sun-fill text-dracula-fg').addClass('bi-moon-stars-fill text-dracula-bg');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Persistence Check
    if (localStorage.getItem('theme') === 'light') {
        $themeBtn.addClass('active');
        $body.addClass('light-theme');
        $themeIcon.removeClass('bi-moon-stars-fill text-dracula-bg').addClass('bi-sun-fill text-dracula-fg');
    }

    /** =====================
     *  CV Menu Logic
     ====================== */
    const $cvBtn = $('#cv-btn-trigger');
    const $cvMenu = $('#cv-menu');

    $cvBtn.on('click', function(e) {
        e.stopPropagation();
        $cvMenu.toggleClass('opacity-0 invisible translate-y-3 opacity-100 visible translate-y-0');
    });

    $(document).on('click', function() {
        $cvMenu.addClass('opacity-0 invisible translate-y-3').removeClass('opacity-100 visible translate-y-0');
    });

    $cvMenu.on('click', 'a', function() {
        $cvMenu.addClass('opacity-0 invisible translate-y-3').removeClass('opacity-100 visible translate-y-0');
    });
});
