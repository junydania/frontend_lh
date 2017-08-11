var body = $('body');
var htmlBody = $('html, body');
var overlay = $('.overlay');
var header = $('.header');
var $mobileMenu = $('.mobile-menu');
var searchOpen = $('.search-open');
var headerSearch = $('.header .search');
var navItemDropdown = $('.header__nav-item--dropdown');
var lngDropDown = $('.lng-dropdown');
var menuClose = $('.menu-close');
var menuOpen = $('.menu-open');
var pat = /^https?:\/\//i;
var contentAjax = $('#content-ajax');
var searchClose = $('.search-close');


/**
 * Breakpoints
 */

function breakpoint() {

  var headerNav = $('.header__nav');
  var headerNavDropDown = $('.header__nav-dropdown');

  Breakpoints({
    mobileMenu: {
      min: 0,
      max: 1132
    }
  });

  Breakpoints.is('mobileMenu');
  Breakpoints.get('mobileMenu').on({
    enter: function () {
      headerNav.appendTo('.mobile-menu__scroll-content');
      headerSearch.appendTo('.mobile-menu__scroll-content');

      header.removeClass('search-opened');
      headerSearch.stop().fadeOut(300);
      overlay.removeClass('is-fade');
      searchClose.stop().fadeOut(300);
      searchOpen.stop().fadeIn(300);
    },
    leave: function () {
      headerNav.appendTo('.header__left');
      headerSearch.insertAfter('.header__right');
      navItemDropdown.removeClass('is-active');
      headerNavDropDown.stop().fadeOut(300);
      mobileMenuClose();
    }
  });
}



/**
 * lazy load
 */

function lazyload() {
  $('.lazy-bg-img').lazyload({
  });

  $('.lazy-img img').lazyload({
  });
}



/**
 * scrollreveal
 */

function scrollRevealInit() {

  var $scrollAnimateHeader = $('.scrollAnimateHeader');

  window.sr = ScrollReveal();

  if ($('.scrollAnimateBottomFade').length) {
    sr.reveal('.scrollAnimateBottomFade', {
      duration: 1000,
      mobile: false,
      distance: '15px',
      origin: 'bottom',
      scale: 1,
      viewFactor: 0.00000000000001,
      viewOffset: {
        bottom: 50
      }
    });
  }

  if ($('.scrollAnimateFade').length) {
    sr.reveal('.scrollAnimateFade', {
      duration: 1000,
      mobile: false,
      distance: '0px',
      origin: 'bottom',
      scale: 1,
      viewFactor: 0.00000000000001,
      viewOffset: {
        bottom: 50
      }
    });
  }

  if ($scrollAnimateHeader.length && $scrollAnimateHeader.css('visibility') == 'hidden') {
    sr.reveal('.scrollAnimateHeader', {
      duration: 1000,
      mobile: false,
      distance: '0px',
      origin: 'bottom',
      scale: 1,
      viewFactor: 0.00000000000001,
      viewOffset: {
        bottom: 50
      }
    });
  }

  if ($('.scrollAnimateHeroSlider').length) {
    sr.reveal('.scrollAnimateHeroSlider', {
      duration: 1000,
      delay: 0,
      mobile: false,
      distance: '0px',
      origin: 'bottom',
      scale: 1,
      viewFactor: 0.00000000000001,
      viewOffset: {
        bottom: 50
      }
    });
  }
}



/**
 * header nav dropdown
 */

function headerNavDropdown() {

  navItemDropdown.on({
      mouseenter: function () {
          if (window.innerWidth >= 1133) {
            overlay.addClass('is-fade');
            $(this).addClass('is-active').find('.header__nav-dropdown').stop().fadeIn(300);
            lngDropDown.removeClass('open');
          }
      },
      mouseleave: function () {
          if (window.innerWidth >= 1133) {
            overlay.removeClass('is-fade');
            $(this).removeClass('is-active').find('.header__nav-dropdown').stop().fadeOut(300);
          }
      }
  });

  navItemDropdown.on('click',  function(event) {
    setTimeout(function(){
      navItemDropdown.trigger('mouseleave');
    },50);
  });

  $('.header__nav-item--dropdown > a').on('click', function(e){
    if (window.innerWidth <= 1132) {
      e.preventDefault();
      var $this = $(this).parent();
      navItemDropdown.not($this).removeClass('is-active');
      navItemDropdown.not($this).find('.header__nav-dropdown').stop().slideUp(300);
      $this.toggleClass('is-active');
      $this.find('.header__nav-dropdown').stop().slideToggle(300);
    }
  });

  $('.header__nav-sub-dropdown > a').on('click', function(e){
    if (window.innerWidth<1133) {
      e.preventDefault();
      $(this).parent().toggleClass('is-active');
      $(this).parent().find('>ul').stop().slideToggle(300);
    }
  });
}



/**
 * header language dropdown
 */

function headerLangDropdown() {

  lngDropDown.on('show.bs.dropdown', function () {
    overlay.addClass('is-fade');
  });
  lngDropDown.on('hide.bs.dropdown', function () {
    if (!header.hasClass('search-opened')) {
      overlay.removeClass('is-fade');
    }
  });
}



/**
 * search
 */

function search() {

  searchOpen.on('click', function (e) {
    e.preventDefault();
    header.addClass('search-opened');
    overlay.addClass('is-fade');
    headerSearch.stop().fadeIn(300);
    searchClose.stop().fadeIn(300);
    searchOpen.stop().fadeOut(300);
    $('.header .search__field').focus();
  });

  searchClose.on('click', function (e) {
    e.preventDefault();
    header.removeClass('search-opened');
    headerSearch.stop().fadeOut(300);
    overlay.removeClass('is-fade');
    searchClose.stop().fadeOut(300);
    searchOpen.stop().fadeIn(300);
  });

  $(document).on('click', function (event) {
    if (window.innerWidth >=1133) {
      if (!$(event.target).closest('.search, .search-open, .search-close, .search__quick-links').length) {
        if (header.hasClass('search-opened')) {
          overlay.removeClass('is-fade');
        }
        header.removeClass('search-opened');
        headerSearch.stop().fadeOut(300);
        searchClose.stop().fadeOut(300);
        searchOpen.stop().fadeIn(300);
      }
    }
  });
}



/**
 * mobile menu close
 */

function mobileMenuClose() {

  body.removeClass('mobile-menu-opened');
  menuClose.stop().hide();
  menuOpen.stop().show();
  $mobileMenu.stop().fadeOut(300);
  overlay.removeClass('is-fade');
}



/**
 * mobile menu
 */

function mobileMenu() {

  menuOpen.on('click', function (e) {
    e.preventDefault();
    $(this).hide();
    body.addClass('mobile-menu-opened');
    menuClose.show();
    $mobileMenu.css('max-height', $(window).outerHeight() - header.outerHeight());
    $mobileMenu.stop().fadeIn(300);
    overlay.addClass('is-fade');
  });

  menuClose.on('click', function (e) {
    e.preventDefault();
    mobileMenuClose();
  });

  $(document).on('click', function (event) {
    if (!$(event.target).closest('.mobile-menu, .menu-open, .menu-close').length) {
      if (body.hasClass('mobile-menu-opened')) {
        overlay.removeClass('is-fade');
      }
      overlay.removeClass('mobile-menu-opened');
      $mobileMenu.stop().fadeOut(300);
      menuClose.hide();
      menuOpen.show();
    }
  });
}



/**
 * mobile menu max height
 */

function mobileMenuMaxHeight() {

  $mobileMenu.css('max-height', $(window).outerHeight() - header.outerHeight());
  $(window).on('resize', function () {
    $mobileMenu.css('max-height', $(window).outerHeight() - header.outerHeight());
  });
}



/**
 * mobile menu overflow scroll
 */

function mobileMenuOverflowScroll() {

  //mousewheel scroll desktop
  if (!isMobile.any()) {
    $mobileMenu.on('mousewheel', function(e) {
      e.preventDefault();

      var mobileMenuScrollContentEl = $('.mobile-menu__scroll-content');
      var mobileMenuEl = $(this);
      var mobileMenuScrollContentHeight = mobileMenuScrollContentEl.outerHeight();
      var mobileMenuMaxHeight = parseInt(mobileMenuEl.css('max-height'));
      var mobileMenuScrollContentTopPos = parseInt(mobileMenuScrollContentEl.css('top'));
      var heigthDiff = mobileMenuMaxHeight - mobileMenuScrollContentHeight;
      var deltaY = e.deltaY;

      if (mobileMenuScrollContentHeight > mobileMenuMaxHeight) {
        if (deltaY < 0) {
          if (mobileMenuScrollContentTopPos + deltaY > heigthDiff) {
            mobileMenuScrollContentEl.css('top', mobileMenuScrollContentTopPos + deltaY);
          }else {
            mobileMenuScrollContentEl.css('top', heigthDiff);
          }
        } else {
          if (mobileMenuScrollContentTopPos + deltaY < 0) {
            mobileMenuScrollContentEl.css('top', mobileMenuScrollContentTopPos + deltaY);
          } else {
            mobileMenuScrollContentEl.css('top', 0);
          }
        }
      }
    });
  } else {//default scrollbar mobile
    $mobileMenu.css('overflow', 'auto');
  }
}



/**
 * hero slider
 */

function heroSlider() {

  var heroSlider = $('.hero-slider');

  heroSlider.each(function(index, el) {
    var dots = $(this).parents('.hero-slider-wrap').find('.hero-slider-dots');
    $(this).not('.slick-initialized').slick({
      fade: true,
      dots: true,
      appendDots: dots,
      swipeToSlide: true,
      touchMove: true
    });
  });

  heroSlider.each(function(index, el) {
    $(this).find('.sld').eq(0).find('.hero-slider__lazy-load-img').lazyload({});
  });

  $('.hero-slider-wrap').each(function(index, el) {
    $(this).find('.hero-slider-nums').html('<div class="slick-nums">1/' + $(this).find('.sld').length + '</div>');
  });

  heroSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $(this).find('.sld').eq(nextSlide).find('.hero-slider__lazy-load-img').lazyload({
    });
    var nextSlideTxt = nextSlide;
    nextSlideTxt = nextSlideTxt + 1;
    $(this).parents('.hero-slider-wrap').find('.hero-slider-nums').html('<div class="slick-nums">' + nextSlideTxt + '/' + $(this).find('.sld').length + '</div>');
  });

  $('.hero-slider__slide-name, .hero-slider__button a').on({
      mouseenter: function () {
          $(this).parents('.hero-slider__slide').find('.hero-slider__slide-image').addClass('is-hover');
      },
      mouseleave: function () {
          $(this).parents('.hero-slider__slide').find('.hero-slider__slide-image').removeClass('is-hover');
      }
  });
}



/**
 * categories mobile
 */

function categoriesMobile() {

  var categoryListCollapse = $('.aside_categories-list__collapse');

  $('.aside_categories-list__toggle').on('click', function (e) {
    e.preventDefault();
    $(this).text(function (i, text) {
      return text === "Hide categories" ? "Show categories" : "Hide categories";
    });
    categoryListCollapse.stop().slideToggle(300);
  });

  $(document).on('click', function (event) {
    if (window.innerWidth < 739) {
      if (!$(event.target).closest('.aside_categories-list').length) {
        categoryListCollapse.stop().slideUp(300);
      }
    }
  });
}



/**
 * aside left mobile
 */

function asideLeftMobile() {

  var asideLeftCollapse = $('.aside-left__collapse');

  $('.aside-left__toggle').on('click', function (e) {
    e.preventDefault();
    $(this).text(function (i, text) {
      return text === "Hide menu" ? "Show menu" : "Hide menu";
    });
    asideLeftCollapse.stop().slideToggle(300);
  });

  $(document).on('click', function (event) {
    if (window.innerWidth < 992) {
      if (!$(event.target).closest('.aside-left').length) {
        asideLeftCollapse.stop().slideUp(300);
      }
    }
  });
}



/**
 * seo spoiler
 */

function seoSpoiler() {

  var seoSpoilerLink = $('.seo-spoiler__link');

  seoSpoilerLink.unbind();
  seoSpoilerLink.on('click', function(event) {
    event.preventDefault();
    var textHeigth = $(this).parents('.seo-spoiler').find('.seo-spoiler__text').outerHeight();
    $parent = $(this).parents('.seo-spoiler');
    if ($parent.hasClass('is-opened')) {
      $parent.find('.seo-spoiler__wrap').stop().animate({'height': 0}, 200);
    }else {
      $parent.find('.seo-spoiler__wrap').stop().animate({'height': textHeigth}, 200);
      clearTimeout(seoSpoilerTimeout);
      var seoSpoilerTimeout = setTimeout(function(){
        $parent.find('.seo-spoiler__wrap').css({'height': 'auto'});
      },201);
    }

    $parent.toggleClass('is-opened');
    $(this).toggleClass('is-active');
    $(this).text(function(i, text){
      return text === "Show less" ? "Show more" : "Show less";
    });
  });

  $(window).resize(function(event) {
    $('.seo-spoiler.is-opened').find('.seo-spoiler__wrap').css({'height': $(this).find('.seo-spoiler__text').outerHeight()});
  });
}



/**
 * Initialization General Scripts for all pages
 */

function initScripts() {
  breakpoint();
  lazyload();
  heroSlider();
  categoriesMobile();
  asideLeftMobile();
  scrollRevealInit();
  seoSpoiler();
  mobileMenuOverflowScroll();
}



/**
 * First Load Page
 */

$(window).on('load', function(){

  initScripts();
  // functions for header
  headerNavDropdown();
  headerLangDropdown();
  search();
  mobileMenu();
  mobileMenuMaxHeight();

  body.css('opacity', 1);
});



/**
 *  Ajax pages
 */

body.on('click', '.js-ajax-link', function (e) {

  if (pat.test(window.location.href)) {
    e.preventDefault();

    if (($(this).hasClass('mobile-ajax-off') && window.innerWidth >= 1133) || (!$(this).hasClass('mobile-ajax-off'))) {
      contentAjax.addClass('is-loading');
      setTimeout(function(){
        htmlBody.animate({
          scrollTop: 0
        }, 0);
      }, 300);

      var url = $(this).attr('href');

      if (window.innerWidth < 1133) {
        mobileMenuClose();
      }
      $.ajax({
        url: url,
        processData: true,
        dataType: 'html',
        success: function (data) {
          document.title = $(data).filter('title').text();
          if (typeof history.pushState != 'undefined') history.pushState(data, 'Page', url);
          var content_to_display = "#content-ajax";
          var current_container = $(content_to_display);

          setTimeout(function () {
            current_container.html(' ');
            current_container.html($(data).find(content_to_display).html());
            initScripts();
            contentAjax.removeClass('is-loading');
            body.css('opacity', 1);
          }, 100);
        },
        error: function(data) {
          return true;
        }
      });
    }
  }else {
    e.preventDefault();
    body.css('opacity', 0);
    var link = $(this).attr("href");
    setTimeout(function() {
      window.location.href = link;
    }, 200);
  }
});

window.onpopstate = function(event) {

  if (pat.test(window.location.href)) {
    contentAjax.addClass('is-loading');
    setTimeout(function(){
      htmlBody.animate({
        scrollTop: 0
      }, 0);
    }, 300);

    $.ajax({
      url: document.location,
      processData: true,
      dataType: 'html',
      success: function (data) {
        document.title = $(data).filter('title').text();
        var content_to_display = "#content-ajax";
        var current_container = $(content_to_display);

        setTimeout(function () {
          current_container.html(' ');
          current_container.html($(data).find(content_to_display).html());
          initScripts();
          contentAjax.removeClass('is-loading');
          body.css('opacity', 1);

        }, 100);
      }
    });
  }
};



/**
 * Ajax tabs
 */

body.on('click', '.tabs__link', function (e) {

  var tabsContent = $('#tabs-content');

  if (pat.test(window.location.href)) {
    e.preventDefault();
    $(this).parent().siblings('li').removeClass('is-active');
    $(this).parent().addClass('is-active');

    tabsContent.addClass('is-loading');

    var url = $(this).attr('href');

    $.ajax({
      url: url,
      processData: true,
      dataType: 'html',
      success: function (data) {
        var content_to_display = "#tabs-content";
        var current_container = $(content_to_display);

        setTimeout(function () {
          current_container.html(' ');
          current_container.html($(data).find(content_to_display).html());
          tabsContent.removeClass('is-loading');
          lazyload();
          sr.sync();
          body.css('opacity', 1);

        }, 200);
      }
    });
  }
});
