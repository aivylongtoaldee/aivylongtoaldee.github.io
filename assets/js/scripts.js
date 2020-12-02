function swipeNavigate(direction) {
  const navsCount = $('#nav span').length;

  return function (e) {
    const activeNav = $('#nav span.active');
    let position = $('#nav span').index(activeNav);
    
    if (direction === 'left') {
      if (position === navsCount - 1) {
        position = -1;
      }

      return $('#nav span').eq(position + 1).click();
    }

    // otherwise, if swipe to the right

    if (position === 0) {
      position = navsCount;
    }
    
    $('#nav span').eq(position - 1).click();
  }
}

function initNav() {

  // set active tab and nav
  $('.section:not(#cover)').hide();
  $('#nav span:first-child').addClass('active');

  $('#nav span').click(function () {
    if ($(this).hasClass('active')) {
      return;
    }

    // switch active nav
    $('#nav span').removeClass('active');
    $(this).addClass('active');

    // switch display section
    const target = $(this).data('target');
    $('.section').hide();
    $(target).fadeIn(1000);
  });

  document.querySelector('body').addEventListener('swiped-left', swipeNavigate('left'));
  document.querySelector('body').addEventListener('swiped-right', swipeNavigate('right'));
}

let countDownTimer;

function runCountdown() {
  const now = new Date();
  const target = new Date('2021/01/23 10:00:00');

  let diffInSeconds = Math.abs(target - now) / 1000;

  // calculate days
  const days = Math.floor(diffInSeconds / 86400);
  diffInSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInSeconds / 3600) % 24;
  diffInSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInSeconds / 60) % 60;
  diffInSeconds -= minutes * 60;

  // calculate seconds
  const seconds = Math.floor(diffInSeconds);

  if (target < now || (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0)) {
    clearInterval(countDownTimer);
    $('span.cd').remove();
    $('h2#unmarried').remove();
    $('h2#married').show();

    return;
  }

  if (days > 0) {
    // days
    $('span#days > b').text(('' + days).padStart(2, '0'));
    $('span#days > i').text(' day' + (days === 1 ? '' : 's'));
  }
  
  // hours
  $('span#hours > b').text(('' + hours).padStart(2, '0'));
  $('span#hours > i').text(' hour' + (hours <= 1 ? '' : 's'));
  
  // minutes
  $('span#minutes > b').text(('' + minutes).padStart(2, '0'));
  $('span#minutes > i').text(' minute' + (minutes <= 1 ? '' : 's'));
  
  // seconds
  $('span#seconds > b').text(('' + seconds).padStart(2, '0'));
  $('span#seconds > i').text(' second' + (seconds <= 1 ? '' : 's'));
}

function initCountdown() {
  countDownTimer = setInterval(runCountdown, 1000);

  $('#cover > span').hide();
  $('#cover').fadeIn(2000);
  $('#cover > span').fadeIn(4000);
}

function initRsvp() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  if (name) {
    $('#name').val(decodeURI(name));
  }
}

async function initForm() {
  $('#rsvp-thanks').hide();

  const onConfirm = async() => {

    $('#confirm').attr('disabled', 'disabled').text('Confirming...');

    const name = $('#name').val();
    const reply = $('#reply').val();

    if (!name || !reply) return;

    const headers = { "Security-key": "aivylongtoaldee" };
    await fetch('https://json.extendsclass.com/bin/bf27e08d8d16', {
      headers,
      method: 'PATCH',
      body: JSON.stringify({
        [name]: reply,
      }),
    });

    $('#rsvp-form').fadeOut(2000, function() {
      $('#rsvp-thanks').fadeIn(function () {
        $('#rsvp-thanks').fadeOut(5000, function() {
          $('#rsvp-form').fadeIn();
          $('#confirm').removeAttr('disabled').text('Confirm');
        });
      });
    });
  };

  $('#confirm').click(onConfirm);
}

(() => {
  initNav();
  initCountdown();
  initRsvp();
  initForm();
}) ();