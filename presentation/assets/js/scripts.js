let timerInterval;
let blinkInterval;
let slideInterval;

const photosCount = 3;

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
  let i = 0;

  slideInterval = setInterval(() => {
    const sel = $('#slideshow');

    i++;

    // sel.hide('slide', { direction: 'left' }, () => {
    //   sel.css('backgroundImage', `url(./assets/compilations/${i}.png)`)
    //   .show('slide', { direction: 'right' });
    // });
    sel.fadeOut(() => {
      sel
        .css('backgroundImage', `url(./assets/compilations/${i}.png)`)
        .fadeIn();
    });

    if (i >= photosCount) {
      return clearInterval(slideInterval);
    }
  }, n);
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
}

function play() {
  $('div#play-container').remove();

  glitch(3600, () => {

    runTimer();
    document.querySelector('audio#sound').play();
    document.querySelector('audio#sound').onended = reset;
    blinkPlayIcon();
    playSlideshow(5000);

  });
}

(function() {

  $('div#play-container').click(play);

})();