jQuery(document).on('ready', function ($) {
    "use strict";

    /*--------------------------
        STICKY MAINMENU
    ---------------------------*/
    $("#mainmenu-area").sticky({
        topSpacing: 0
    });

    /*---------------------------
        SMOOTH SCROLL
    -----------------------------*/
    $('ul#nav li a[href^="#"], a.navbar-brand, a.scrolltotop').on('click', function (event) {
        var id     = $(this).attr("href");
        var offset = 60;
        var target = $(id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 1500, "easeInOutExpo");
        event.preventDefault();
    });

    /*----------------------------
        MOBILE & DROPDOWN MENU
    ------------------------------*/
    jQuery('.stellarnav').stellarNav({
        theme     : 'dark',
        breakpoint: 900,
    });

    /*-----------------------------
        MENU HAMBERGER ICON
    ------------------------------*/
    var hamberger = $('.header-top-area svg');
    $('.menu-toggle.full').on('click', function () {
        var menuclass = $('#main-nav').attr('class');
        if ('stellarnav dark mobile active' === menuclass) {
            hamberger.addClass('active');
        } else if ('stellarnav dark mobile' === menuclass) {
            hamberger.removeClass('active');
        }
    });
    $(window).on('resize', function () {
        var menuclass = $('#main-nav').attr('class');
        if ('stellarnav dark desktop' === menuclass) {
            hamberger.removeClass('active');
        }
    });

    /*----------------------------
        SCROLL TO TOP
    ------------------------------*/
    $(window).on('scroll', function () {
        var $totalHeight = $(window).scrollTop();
        var $scrollToTop = $(".scrolltotop");
        if ($totalHeight > 300) {
            $(".scrolltotop").fadeIn();
        } else {
            $(".scrolltotop").fadeOut();
        }

        if ($totalHeight + $(window).height() === $(document).height()) {
            $scrollToTop.css("bottom", "90px");
        } else {
            $scrollToTop.css("bottom", "20px");
        }
    });

    /*------------------------------
        SEARCH FORM BUTTON
    -------------------------------*/
    $('.search-form-buton').on('click', function () {
        $('.header-search-form').slideToggle();
        return false;
    });

    /*------------------------------
        BUTTON RIPPLE EFFECT
    -------------------------------*/
    var rippleButton = $('.ripple-btn');
    rippleButton.append('<span></span>').html();
    rippleButton.on('mouseenter', function (e) {
        var parentOffset = $(this).offset(),
            relX         = e.pageX - parentOffset.left,
            relY         = e.pageY - parentOffset.top;
        $(this).find('span').css({
            top : relY,
            left: relX
        })
    })
    rippleButton.on('mouseout', function (e) {
        var parentOffset = $(this).offset(),
            relX         = e.pageX - parentOffset.left,
            relY         = e.pageY - parentOffset.top;
        $(this).find('span').css({
            top : relY,
            left: relX
        })
    });

    /*--------------------------
       PARALLAX BACKGROUND
    ----------------------------*/
    $(window).stellar({
        responsive         : true,
        positionProperty   : 'position',
        horizontalScrolling: false
    });

    /*---------------------------
	    HOME SLIDER
	-----------------------------*/
    var homeSlider = $('.welcome-slider-area');
    if (homeSlider.length > 0) {
        homeSlider.owlCarousel({
            merge          : true,
            smartSpeed     : 1000,
            loop           : true,
            nav            : true,
            dots           : true,
            navText        : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            autoplay       : true,
            autoplayTimeout: 4000,
            margin         : 0,
            animateIn      : 'fadeIn',
            animateOut     : 'fadeOut',
            responsiveClass: true,
            responsive     : {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }

    /*------------------------------
        VIDEO POPUP
    --------------------------------*/
    var $videoModal = $(".open-video-popup");
    $videoModal.modalVideo({
        channel: 'youtube'
    });

    /*-----------------------------
        EVENT TIMER
    -------------------------------*/
    $('.event_lounch_time').countdown({
        render: function (data) {
            $(this.el).html("<div>" + this.leadingZeros(data.days, 3) + " <span>days</span></div><div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div><div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>");
        }
    });

    /*-------------------------------
        GOAL AMOUNT ANIMATION
    --------------------------------*/
    $("[data-progress-animation]").each(function () {
        var $this = $(this);
        $this.appear(function () {
            var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);
            if (delay > 1) $this.css("animation-delay", delay + "ms");
            setTimeout(function () {
                $this.animate({
                    width: $this.attr("data-progress-animation")
                }, 800);
            }, delay);
        }, {
            accX: 0,
            accY: -50
        });
    });

    /* -------------------------------------------------------
     GALLERY FILTER SET ACTIVE CLASS FOR STYLE
    ----------------------------------------------------------*/
    $('.gallery-menu li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    /* ------------------------------
     GALLERY FILTERING
     -------------------------------- */
    $('.gallery-menu li').on('click', function () {
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');

        $(".gallery-list").isotope({
            filter          : filterValue,
            animationOptions: {
                duration: 750,
                easing  : 'linear',
                queue   : false,
            }
        });
        return false;
    });

    /*------------------------------
        GALLERY FEED POPUP
    -------------------------------*/
    $('.gallery-big-thumb').magnificPopup({
        type        : 'image',
        removalDelay: 500,       //delay removal by X to allow out-animation
        callbacks   : {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup 
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass    = this.st.el.attr('data-effect');
            }
        },
        gallery: {
            enabled: true
        },
        closeOnContentClick: true,
        midClick           : true   // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    /*-----------------------------------
        TESTMONIAL SLIDER ACTIVE
    -----------------------------------*/
    var clientDetails = $('.testmonial-details');
    if (clientDetails.length > 0) {
        clientDetails.owlCarousel({
            loop           : false,
            margin         : 30,
            autoplay       : true,
            dots           : true,
            nav            : true,
            navText        : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            autoplayTimeout: 3000,
            smartSpeed     : 600,
            responsive     : {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                992: {
                    items: 1
                }
            }
        });
    }

    /*---------------------------
        CLIENT SLIDER
    -----------------------------*/
    var clientCarousel = $('.client-slider');
    if (clientCarousel.length > 0) {
        clientCarousel.owlCarousel({
            merge          : true,
            smartSpeed     : 1000,
            loop           : true,
            nav            : true,
            center         : false,
            dots           : true,
            navText        : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            autoplay       : true,
            autoplayTimeout: 3000,
            margin         : 20,
            responsiveClass: true,
            responsive     : {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                },
                1200: {
                    items: 5
                }
            }
        });
    }

    /*-----------------------------
        EVENT SLICK ACTIVE
    -----------------------------*/
    var eventSlickList = $('.event-list-content');
    if (eventSlickList.length > 0) {
        eventSlickList.slick({
            dots           : false,
            arrows         : false,
            infinite       : false,
            vertical       : true,
            verticalSwiping: true,
            speed          : 300,
            slidesToShow   : 4,
            slidesToScroll : 4,
            responsive     : [{
                breakpoint: 1200,
                settings  : {
                    slidesToShow  : 3,
                    slidesToScroll: 3,
                }
            }, {
                breakpoint: 992,
                settings  : {
                    slidesToShow  : 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 768,
                settings  : {
                    slidesToShow  : 1,
                    slidesToScroll: 1
                }
            }]
        });
    }

    /*---------------------------
        EVENT SLIDER
    -----------------------------*/
    var eventCarousel = $('.event-list-thumbs');
    if (eventCarousel.length > 0) {
        eventCarousel.owlCarousel({
            merge          : true,
            smartSpeed     : 1000,
            loop           : false,
            nav            : true,
            center         : false,
            dots           : true,
            dotsContainer  : '.slick-track',
            navText        : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            autoplay       : false,
            autoplayTimeout: 3000,
            margin         : 20,
            animateIn      : 'fadeIn',
            animateOut     : 'fadeOut',
            responsiveClass: true,
            responsive     : {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }


    /*--------------------------
        ACCORDION ACTIVE
    ---------------------------*/
    $('#accordion-main .panel.panel-default').on('click', function (e) {
        $('#accordion-main .panel.panel-default').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
        e.preventDefault();
    });
    $('#accordion-two .panel.panel-default').on('click', function (e) {
        $('#accordion-two .panel.panel-default').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
        e.preventDefault();
    });

    /*--------------------------
        ACTIVE WOW JS
    ----------------------------*/
    new WOW().init();

    /*---------------------------
        PLACEHOLDER ANIMATION
    ----------------------------*/
    Placeholdem(document.querySelectorAll('[placeholder]'));

}(jQuery));



jQuery(window).on('load', function () {
    "use strict";
    /*--------------------------
        PRE LOADER
    ----------------------------*/
    $(".preeloader").fadeOut(1000);

    /*---------------------------
        ISOTOPE ACTIVE ON LOAD
    -----------------------------*/
    $(".gallery-list").isotope({
        itemSelector: '.single-gallery-item'
    });
});