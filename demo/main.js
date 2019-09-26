(function($) {
  $(function() {
    var signupChannel = localStorage.getItem('emiller.signup-channel');
    if (signupChannel && $('#mce-CHANNEL').length) {
      $('#mce-CHANNEL').val(signupChannel);
    }

    // Don't show promotion if completed.
    var hasCompletionCookie = $.cookie('emiller.popup_promotion.completed');
    if (hasCompletionCookie) return;

    var $component = $('[data-subscriber-overlay]');

    // Check that the data-video-hero component exists
    if ($component.length <= 0) {
      return;
    }

    var $close = $component.find('[data-subscriber-overlay-close]');
    var $remindMe = $component.find('[data-subscriber-overlay-remind-me]');
    var $complete = $component.find('[data-subscriber-overlay-complete]');

    var hasPromotionCookie = $.cookie('emiller.popup_promotion.remind');

    function initClickHandlers() {
      $close.on('click', function() {
        closeOverlay();

        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({
            event: 'overlay_closed',
          });
        }
      });

      $remindMe.on('click', function() {
        closeOverlay();

        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({
            event: 'overlay_remind_me',
          });
        }
      });

      $complete.on('click', function() {
        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({
            event: 'overlay_completed',
          });
        }

        $.cookie('emiller.popup_promotion.completed', 1, { expires: 10 * 365 });
        localStorage.setItem('emiller.signup-channel', 'Subscriber Overlay');
      });
    }

    function initEventHandlers() {
      $component.bind('keyup', function(event) {
        // Esc
        if (event.keyCode === 27) {
          closeOverlay();
        }
      });

      $('[data-tabloop-subscribe]').tabloop();
    }

    function closeOverlay() {
      $.cookie('emiller.popup_promotion.remind', 1, { expires: 30 });
      $component.removeClass('visible');

      // Reset focus to page top
      $('[data-tabloop-subscribe]').unbind();
      $('[data-tabloop-subscribe]').attr('tabindex', '-1');
      $('#skip-link').focus();
    }

    function showPromotion(exists) {
      if (exists) return;

      setTimeout(function() {
        $component.addClass('visible');
        $close.focus();
        $('[data-tabloop-subscribe]').attr('tabindex', '1');

        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({
            event: 'overlay_seen',
          });
        }
      }, 5000);
    }

    // ESC to close modal
    // Tab locks within modal

    // INIT
    showPromotion(hasPromotionCookie);
    initClickHandlers();
    initEventHandlers();
  });

  $.fn.tabloop = function() {
    var p = {
      collection: this,
    };
    $(this).keydown(p, function(e) {
      if ($(e.currentTarget)[0] == e.data.collection.last()[0]) {
        e.data.collection.first().focus();
        e.preventDefault();
      }
    });
  };
})($, this);
