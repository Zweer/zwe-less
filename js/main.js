(function($) {
  var $body = $('body'),
      navTop = 0;

  $(function() {
    navTop = $('nav[role="main"]').position().top;
  });

  $(window).scroll(function() {
    if (navTop < $(window).scrollTop()) {
      $body.addClass('fixed');
    } else {
      $body.removeClass('fixed');
    }
  });
})(window.jQuery);