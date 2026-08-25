/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js
02. nice-select Js
03. Sticky Header Js
04. Sidebar Js
05. Search Js
06. custom Js
07. Counter Js
08. Wow Js
09. magnificPopup video view
10. auto update year
11. magnific-Popup-image-active
12. back-to-top
13. mobile menu Js
14. Hero 3 Animation
15. tp-service-2-wrap-content
16. Team Social Active
17. jarallax Js
18. Faq class add
19. image-container
20. countdown js
21. One Page Scroll Js
****************************************************/

(function ($) {
	"use strict";

	var windowOn = $(window);
	////////////////////////////////////////////////////
	// 01. PreLoader Js
	$(window).on('load', function () {
		$(".preloader").fadeOut(500);
	});
  

	////////////////////////////////////////////////////
	// 02. nice-select Js
	$('.select').niceSelect();

	///////////////////////////////////////////////////
	// 03. Sticky Header Js
	windowOn.on('scroll', function () {
		var scroll = windowOn.scrollTop();
		if (scroll < 400) {
			$("#header-sticky").removeClass("header-sticky");
		} else {
			$("#header-sticky").addClass("header-sticky");
		}
	});

	if ($('.tp-header-height').length > 0) {
        var headerHeight = document.querySelector(".tp-header-height");
        var setHeaderHeight = headerHeight.offsetHeight;

        $(".tp-header-height").each(function () {
            $(this).css({
                'height': setHeaderHeight + 'px'
            });
        });
    }

	////////////////////////////////////////////////////
	// 04. Sidebar Js
	$(".tp-menu-bar").on("click", function () {
		$(".tpoffcanvas").addClass("opened");
		$(".body-overlay").addClass("apply");
	});
	$(".close-btn").on("click", function () {
		$(".tpoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});
	$(".body-overlay").on("click", function () {
		$(".tpoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});

	////////////////////////////////////////////////////
	// 05. Search Js
	$(".tp-search-click").on("click", function () {
		$(".tp-search-form-toggle,.tp-search-body-overlay").addClass("active");
	});

	$(".tp-search-close,.tp-search-body-overlay").on("click", function () {
		$(".tp-search-form-toggle,.tp-search-body-overlay").removeClass("active");
	});
  
	////////////////////////////////////////////////////
	// 06. custom Js
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});


	////////////////////////////////////////////////////
	// 07. Counter Js
	new PureCounter();
	new PureCounter({
		filesizing: true,
		selector: ".filesizecount",
		pulse: 2,
	});
	
	////////////////////////////////////////////////////
	// 08. Wow Js
	new WOW().init();


	////////////////////////////////////////////////////
	// 09. magnificPopup video view
	$(".popup-video").magnificPopup({
		type: "iframe",
	});


	////////////////////////////////////////////////////
	// 10. auto update year
	$('#year').text(new Date().getFullYear());


	////////////////////////////////////////////////////
	// 11. magnific-Popup-image-active
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-with-zoom',
		removalDelay: 500,
	});


	////////////////////////////////////////////////////
	// 12. back-to-top

	var btn = $('#back_to_top');
	var btn_wrapper = $('.back-to-top-wrapper');

	windowOn.on("scroll", function() {
	if (windowOn.scrollTop() > 300) {
		btn_wrapper.addClass('back-to-top-btn-show');
	} else {
		btn_wrapper.removeClass('back-to-top-btn-show');
	}
	});

	btn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '300');
	});

	////////////////////////////////////////////////////
	// 13. mobile menu Js
	var tpMenuWrap = $('.tp-mobile-menu-active > ul').clone();
	var tpSideMenu = $('.tp-offcanvas-menu nav');
	tpSideMenu.append(tpMenuWrap);
	if ($(tpSideMenu).find('.tp-submenu').length != 0) {
		$(tpSideMenu).find('.tp-submenu').parent().append('<button class="tp-menu-close"><i class="far fa-chevron-right"></i></button>');
	}
	var sideMenuList = $('.tp-offcanvas-menu nav > ul > li button.tp-menu-close, .tp-offcanvas-menu nav > ul li.has-dropdown > a');
	$(sideMenuList).on('click', function (e) {
		e.preventDefault();
		if (!($(this).parent().hasClass('active'))) {
			$(this).parent().addClass('active');
			$(this).siblings('.tp-submenu').slideDown();
		} else {
			$(this).siblings('.tp-submenu').slideUp();
			$(this).parent().removeClass('active');
		}
	});


  /////////////////////////////////////////////////////
  // 14. Hero 3 Animation

	const radio_buttons = document.querySelector("#video_check");
	const video_start = document.querySelector(".tp-hero-video-start");

	if (radio_buttons) {
	radio_buttons.addEventListener('click', function () {
		let video = document.querySelector(".video-title")
		let videoClose = document.querySelector(".video-title.close-video-title")
		if (radio_buttons.checked) {
		document.querySelector(".wrapper").style.zIndex = "1";
		video.style.display = "none";
		videoClose.style.display = "block";
		video_start.classList.add('start-video');

		}
		else {
		document.querySelector(".wrapper").style.zIndex = "1";
		video.style.display = "block";
		videoClose.style.display = "none";
		video_start.classList.remove('start-video');
		}
	});
	}


	/////////////////////////////////////////////////////
	// 15. tp-service-2-wrap-content
	$(window).on('load', function () {
		budgeto_height_ct_grid();
	});
	function budgeto_height_ct_grid($scope){
		$('.tp-service-2-wrap').each(function () {
			var elementHeight = $(this).find(".tp-service-2-content-bottom").height();
			$(this).find(".tp-service-2-content-bottom").css("margin-bottom",  "-"+elementHeight + "px");     
		});

	}

	/////////////////////////////////////////////////////
	// 16. Team Social Active

	$('.social-toggle-icon').on('click', function () {
		$(this).parent().find('ul').slideToggle(400);
		$(this).find('i').toggleClass('fa-times');
		return false;
	});


	////////////////////////////////////////////////////
	// 17. jarallax Js
	if ($('.jarallax').length > 0) {
		$('.jarallax').jarallax({
			speed: 0.2,
			imgWidth: 1200,
			imgHeight: 520,
		});
	};

	////////////////////////////////////////////////////
	// Parallax Js
	if ($('.scene').length > 0) {
		$('.scene').parallax({
			scalarX: 5.0,
			scalarY: 5.0,
		});
	};
	if ($('.scene-y').length > 0) {
		$('.scene-y').parallax({
			scalarY: 5.0,
			scalarX: 0,
		});
	};

	////////////////////////////////////////
	// 18. Faq class add
	document.querySelectorAll('.faq-expend').forEach(button => {
		button.addEventListener('click', () => {
			const accordionItem = button.closest('.accordion-item');
			document.querySelectorAll('.accordion-item').forEach(item => {
				item.classList.remove('expand');
			});
			accordionItem.classList.add('expand');
				});
		});
		
	////////////////////////////////////////
	// 19. image-container

	const imageContainers = document.querySelectorAll(".image-container");
	const texts = document.querySelectorAll(".text");
	const toggleBtns = document.querySelectorAll(".toggle-btn");

	toggleBtns.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			imageContainers[index].classList.toggle("small");
			texts[index].classList.toggle("show");

			const icon = btn.querySelector("i");
			icon.classList.toggle("fa-eye");
			icon.classList.toggle("fa-eye-slash");
			icon.classList.toggle("active");
		});
	});


	////////////////////////////////////////
	// 20. countdown js
    function makeTimer() { 
		var endTime = new Date("20 apr 2026 9:56:00 GMT+01:00");      
		endTime = (Date.parse(endTime) / 1000);
		var now = new Date();
		now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		var days = Math.floor(timeLeft / 86400); 
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));  
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }
		$(".days").html(days + "<span>Days</span>");
		$(".hours").html(hours + "<span>Hours</span>");
		$(".minutes").html(minutes + "<span>Minutes</span>");
		$(".seconds").html(seconds + "<span>Seconds</span>");
	}
	setInterval(function() { makeTimer(); }, 1000);


	////////////////////////////////////////////////////
	// 21. One Page Scroll Js
	function scrollNav() {
		$('.tp-onepage-menu li a').on("click", function (){
		  $(".tp-onepage-menu li a.active").removeClass("active");     
		  $(this).addClass("active");
		  
		  $('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - 96
		  }, 300);
		  return false;
		});
	  }
	scrollNav();

})(jQuery);