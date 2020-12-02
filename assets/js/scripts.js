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

let countDownTimer;

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
  const onConfirm = async() => {
    const name = $('#name').val();
    const reply = $('#reply').val();

    $.getJSON('https://jsonbase.com/aivylongtoaldee/rsvp', data => {
      console.log(data);
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