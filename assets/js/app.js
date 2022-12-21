$(document).ready(function() {

  'use strict';

  // =====================
  // Membership Navigation
  // Add current class to
  // the current page
  // =====================

  var pathname = window.location.pathname;

  $('.js-nav__link-membership[href="'+ pathname +'"]').addClass('c-nav__link--current');

  // =====================
  // Navigation
  // =====================

  $('.js-nav-toggle').click(function(e) {
    e.preventDefault();
    $('.c-nav-wrap').toggleClass('is-active');
    $(this).toggleClass('c-nav-toggle--close');
    $('body').toggleClass('e-mode-mobile');
  });

  // =====================
  // Koenig Gallery
  // =====================
  var gallery_images = document.querySelectorAll('.kg-gallery-image img');

  gallery_images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });

  // =====================
  // Decode HTML entities returned by Ghost translations
  // Input: Plus d&#x27;articles
  // Output: Plus d'articles
  // =====================

  function decoding_translation_chars(string) {
    return $('<textarea/>').html(string).text();
  }

  // =====================
  // Responsive videos
  // =====================

  $('.c-content').fitVids({
    'customSelector': [ 'iframe[src*="ted.com"]'          ,
                        'iframe[src*="player.twitch.tv"]' ,
                        'iframe[src*="dailymotion.com"]'  ,
                        'iframe[src*="facebook.com"]'
                      ]
  });

  // =====================
  // Images zoom
  // =====================

  $('.c-content img').attr('data-action', 'zoom');

  // If the image is inside a link, remove zoom
  $('.c-content a img').removeAttr('data-action');

  // =====================
  // Clipboard URL Copy
  // =====================

  var clipboard = new ClipboardJS('.js-share__link--clipboard');

  clipboard.on('success', function(e) {
    var element = $(e.trigger);

    element.addClass('tooltipped tooltipped-s');
    element.attr('aria-label', clipboard_copied_text);

    element.mouseleave(function() {
      $(this).removeAttr('aria-label');
      $(this).removeClass('tooltipped tooltipped-s');
    });
  });

  // =====================
  // Ajax Load More
  // =====================

  var pagination_next_url = $('link[rel=next]').attr('href'),
    $load_posts_button = $('.js-load-posts');

  $load_posts_button.click(function(e) {
    e.preventDefault();

    var request_next_link =
      pagination_next_url.split(/page/)[0] +
      'page/' +
      pagination_next_page_number +
      '/';

    $.ajax({
      url: request_next_link,
      beforeSend: function() {
        $load_posts_button.text(decoding_translation_chars(pagination_loading_text));
        $load_posts_button.addClass('c-btn--loading');
      }
    }).done(function(data) {
      var posts = $('.js-post-card__wrap', data);

      $('.js-grid').append(posts);

      $load_posts_button.text(decoding_translation_chars(pagination_more_posts_text));
      $load_posts_button.removeClass('c-btn--loading');

      pagination_next_page_number++;

      // If you are on the last pagination page, hide the load more button
      if (pagination_next_page_number > pagination_available_pages_number) {
        $load_posts_button.addClass('c-btn--disabled').attr('disabled', true);
      }
    });
  });

  // =====================
  // Mobile Search form
  // =====================
  var mSearchForm = document.getElementById("c-search");
  mSearchForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var searchParam = $(this).find('.c-search__stx')[0].value;
    window.location.href = '/search/' + encodeURIComponent(searchParam.trim());
    return false;
  });

  // =====================
  // Tab
  // =====================
  $('.c-home__post-tabs .c-home__post-tab--link').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.c-home__post-tabs .c-home__post-tab--link').removeClass('current');
    $('.c-home__post-tab--content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })
});


const shopSwiper = new Swiper('.c-shop-carousel__swiper', {
  // If we need pagination
  pagination: {
    el: '.c-shop-carousel .swiper-pagination',
    enabled: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.c-shop-carousel .swiper-button-next',
    prevEl: '.c-shop-carousel .swiper-button-prev',
    enabled: false
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.c-shop-carousel .swiper-scrollbar',
  },

  slidesPerView: 2,
  spaceBetween: 20,
  grid: {
    rows: 2
  },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
      grid: {
        rows: 2
      },
      navigation: {
        enabled: false
      },
      pagination: {
        enabled: true
      }
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
      grid: {
        rows: 2
      },
      navigation: {
        enabled: false
      },
      pagination: {
        enabled: true
      }
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 26,
      grid: {
        rows: 1
      },
      navigation: {
        enabled: false
      },
      pagination: {
        enabled: false
      }
    },
    1240: {
      slidesPerView: 4,
      spaceBetween: 26,
      grid: {
        rows: 1
      },
      navigation: {
        enabled: true
      },
      pagination: {
        enabled: false
      }
    }
  }
});

const shop_hero = new Swiper('.c-shop-featured__carousel--swiper', {
  // Navigation arrows
  navigation: {
    nextEl: '.c-shop-featured__carousel .swiper-button-next',
    prevEl: '.c-shop-featured__carousel .swiper-button-prev',
  },

  slidesPerView: 1,
  spaceBetween: 40,
});

history.scrollRestoration = "manual"