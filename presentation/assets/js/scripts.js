let timerInterval;
let blinkInterval;
let slideInterval;

const photosCount = 45;

function runTimer() {
  let s = 0, m = 0, h = 0;

  timerInterval = setInterval(() => {

    s++;

    if (s === 60) {
      s = 0;
      m++;
    }

    if (m === 60) {
      m = 0;
      h++;
    }

    $('span#hr').html((h + '').padStart(2, '0'));
    $('span#min').html((m + '').padStart(2, '0'));
    $('span#sec').html((s + '').padStart(2, '0'));

  }, 1000);
}

function glitch(t, cb) {
  $('img#bad-reception').css('visibility', 'visible');

  const st = setTimeout(() => {
    $('img#bad-reception').css('visibility', 'hidden');
    typeof cb === 'function' && cb();

    clearTimeout(st);
  }, t);
}

function playSlideshow(n) {
  let i = 1;

  slideInterval = setInterval(() => {
    const sel = $('#slideshow');

    i++;

    if ([2].includes(i)) {
      glitch(200, () => {
        sel.hide();
        sel.css('backgroundImage', `url(./compilations/${i}.jpg)`).fadeIn();
      });
    } else {
      sel.fadeOut(() => {
        sel.css('backgroundImage', `url(./compilations/${i}.jpg)`).fadeIn();
      });
    }

    const caption = getCaption(i);
    
    if (caption) {
      $('#ve-caption').html(caption).show();
    } else {
      $('#ve-caption').hide();
    }

    if (i >= photosCount) {
      return clearInterval(slideInterval);
    }
  }, n);
}

function getCaption(n) {
  return {
    2: 'Baby',
    3: 'Date #0001 - The Port',
    7: 'Boys Avenue Concert - Waterfront',
    15: 'Taiwan',
  }[n] || '';
}

function blinkPlayIcon() {
  blinkInterval = setInterval(() => {
    const v = $('span#play-blinker').css('visibility');
    $('span#play-blinker').css('visibility', v === 'visible' ? 'hidden' : 'visible');
  }, 500);
}

function reset() {
  clearInterval(timerInterval);
  clearInterval(blinkInterval);
  clearInterval(slideInterval);

  glitch(999999999);
  $('#vhs-effect').hide();
}

function play() {
  $('div#play-container').remove();

  glitch(2600, () => {

    runTimer();
    document.querySelector('audio#sound').play();
    document.querySelector('audio#sound').onended = reset;
    blinkPlayIcon();
    // playSlideshow(3000);
    playSlideshow(146000 / photosCount);

  });
}

(function() {

  $('div#play-container').click(play);

})();