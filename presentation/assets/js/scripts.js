function runTimer() {
  let s = 0;
  let m = 0;
  let h = 0;
  const i = setInterval(() => {

    s++;

    if (s === 60) {
      s = 0;
      m++;
    }

    if (m === 60) {
      m = 0;
      h++;
    }

    document.querySelector('span#hr').innerHTML = (h + '').padStart(2, '0');
    document.querySelector('span#min').innerHTML = (m + '').padStart(2, '0');
    document.querySelector('span#sec').innerHTML = (s + '').padStart(2, '0');

  }, 1000);
}

function glitch(t) {

  document.querySelector('img#bad-reception').style.visibility = 'visible';

  setTimeout(() => {
    console.log('done');
    document.querySelector('img#bad-reception').style.visibility = 'hidden';
  }, t);

}


(function() {
  glitch(10000);
  runTimer();
})();