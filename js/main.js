(function($) {
  var $nav = $('nav[role="main"]'),
      navTop = 0;

  $(function() {
    navTop = $nav.position().top;
  });

  $(window).scroll(function() {
    if (navTop < $(window).scrollTop()) {
      $nav.addClass('fixed');
    } else {
      $nav.removeClass('fixed');
    }
  });
})(window.jQuery);