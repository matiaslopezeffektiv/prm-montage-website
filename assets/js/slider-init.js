/***************************************************
==================== JS INDEX ======================
****************************************************
01. tp-hero-slider-zoom
02. tp-testimonial-bg-active
03. tp-project-slider-active
04. tp-testimonial-2-slide
05. tp-text-slider-active
06. tp-chose-3-slide
07. tp-testimonial-3-slide
08. tp-brands-3-slider-active
09. tp-service-4-slide
10. tp-hero-5-slider
11. tp-project-slider-active
12. tp-project-slider-active
13. tp-hero-7-slider-active
14. postbox-slider-active
****************************************************/

(function ($) {
	"use strict";

	////////////////////////////////////////////////////
	// 01. tp-hero-slider-zoom
    var menu = ['Investment solution', 'Market analysis', 'Strategic consulting']
    var hero_slider = new Swiper('.tp-hero-slider-zoom', {
        slidesPerView: 1,
        speed:1500,
        spaceBetween: 0,
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 6000,
        },
        pagination: {
            el: ".tp-hero-slider-pagenation",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
    });

	////////////////////////////////////////////////////
	// 02. tp-testimonial-bg-active
	document.addEventListener('DOMContentLoaded', function () {
		var thumbs = new Swiper(".tp-testimonial-bottom-thumb-active", {
			spaceBetween: 0,
			slidesPerView: 4,
			loop: false,
			allowTouchMove: false,
			slideToClickedSlide: true,
			watchSlidesProgress: true,
		});

		var slider = new Swiper(".tp-testimonial-content-active", {
			spaceBetween: 0,
			slidesPerView: 1,
			loopedSlides: 6,
			loop: false,
			allowTouchMove: true,
			autoplay: {
				delay: 6000,
			},
			pagination: {
				el: '.tp-testimonial-pagination',
				clickable: true
			},
			thumbs: {
				swiper: thumbs
			}
		});
	});



	////////////////////////////////////////////////////
	// 03. tp-project-slider-active
	var swiper = new Swiper(".tp-project-slider-active", {
		slidesPerView: 1,
		speed:1000,
		spaceBetween: 25,
		loop: true,
		observer: true,
		observeParents: true,
		breakpoints: {
			'1200': {
				slidesPerView: 4,
			},
			'991': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	////////////////////////////////////////////////////
	// 04. tp-testimonial-2-slide
	var slider = new Swiper('.tp-testimonial-2-slide', {
		slidesPerView: 1,
		speed: 700,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: ".tp-testimonial-2-next",
			prevEl: ".tp-testimonial-2-prev",
		},
		autoplay: {
			delay: 4000,
		},
	});

    ////////////////////////////////////////////////////
	// 05. tp-text-slider-active
    var tp_text_slide = new Swiper(".tp-text-slider-active", {
        loop: true,
        freemode: true,
        slidesPerView: 'auto',
        spaceBetween: 40,
        centeredSlides: true,
        allowTouchMove: false,
        speed: 4000,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
    });

    ////////////////////////////////////////////////////
	// 06. tp-chose-3-slide
	var chose_3 = new Swiper('.tp-chose-3-slide', {
		slidesPerView: 1,
		speed: 700,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: ".tp-testimonial-2-next",
			prevEl: ".tp-testimonial-2-prev",
		},
		autoplay: {
			delay: 4000,
		},
	});

	////////////////////////////////////////////////////
	// 07. tp-testimonial-3-slide
	var slider = new Swiper('.tp-testimonial-3-slide', {
		slidesPerView: 1,
		speed: 700,
		spaceBetween: 30,
		loop: true,
        navigation: {
			nextEl: ".tp-testimonial-2-next",
			prevEl: ".tp-testimonial-2-prev",
		},
		autoplay: {
			delay: 4000,
		},
	});

    ////////////////////////////////////////////////////
	// 08. tp-brands-3-slider-active
    var tp_brand_slide = new Swiper(".tp-brands-3-slider-active", {
        loop: true,
        freemode: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        allowTouchMove: false,
        speed: 4000,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
    });

    ////////////////////////////////////////////////////
	// 09. tp-service-4-slide
    var tp_service_4 = new Swiper(".tp-service-4-slide", {
		slidesPerView: 1,
		speed: 700,
		spaceBetween: 30,
		loop: true,
        effect: "fade",
		navigation: {
			nextEl: ".tp-testimonial-2-next",
			prevEl: ".tp-testimonial-2-prev",
		},
		autoplay: {
			delay: 4000,
		},
	});


	////////////////////////////////////////////////////
	// 10. tp-hero-5-slider
	var slider = new Swiper('.tp-hero-5-slider', {
        loop: true,
        freemode: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        allowTouchMove: false,
        speed: 4000,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
	});

	////////////////////////////////////////////////////
	// 11. tp-project-slider-active
	var swiper = new Swiper(".tp-project-5-slider-active", {
		slidesPerView: 1,
		speed:1000,
		spaceBetween: 25,
		loop: true,
		observer: true,
		observeParents: true,
		breakpoints: {
			'1200': {
				slidesPerView: 3,
			},
			'991': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	////////////////////////////////////////////////////
	// 12. tp-project-slider-active
	var swiper = new Swiper(".tp-process-5-slider-active", {
		slidesPerView: 1,
		speed:1000,
		spaceBetween: 25,
		loop: true,
		observer: true,
		observeParents: true,
		breakpoints: {
			'1200': {
				slidesPerView: 2,
			},
			'991': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	////////////////////////////////////////////////////
	// 13. tp-hero-7-slider-active
	var swiper = new Swiper(".tp-hero-7-slider-active", {
		slidesPerView: "auto",
		speed:1000,
		spaceBetween: 20,
		loop: false,
	});

	////////////////////////////////////////////////////
	// 14. postbox-slider-active
	var swiper = new Swiper(".postbox-slider-active", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: ".postbox-arrow-next",
			prevEl: ".postbox-arrow-prev",
		},
	});


	////////////////////////////////////////////////////
	// 15. nt-testimonial-slide (PRM Montage — recensioner)
	var nt_testimonial_slide = new Swiper('.nt-testimonial-slide', {
		slidesPerView: 1,
		speed: 600,
		spaceBetween: 26,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.nt-testimonial-next',
			prevEl: '.nt-testimonial-prev',
		},
		breakpoints: {
			'1200': { slidesPerView: 3 },
			'768': { slidesPerView: 2 },
			'0': { slidesPerView: 1 },
		},
	});

	////////////////////////////////////////////////////
	// 04. tp-testimonial-2-slide
	var slider = new Swiper('.tp-contact-slide', {
		slidesPerView: 1,
		speed: 700,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: ".tp-contact-next",
			prevEl: ".tp-contact-prev",
		},
		autoplay: {
			delay: 4000,
		},
	});



})(jQuery);