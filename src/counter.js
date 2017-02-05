function createCounter (document, saveCounter) {
  var html =  '<button id="increment">Increment it!</button> <span id="counter">0</span>';
  document.body.innerHTML = html;
  document.getElementById('increment').addEventListener('click', function () {
    saveCounter(parseInt(document.getElementById('counter').innerHTML, 10) + 1, function (err) {
      if (err) {}
      else {
        document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML, 10) + 1;
      }
    });
  });
};

if (typeof module !== 'undefined') {
  module.exports = createCounter;
}
else {
  function simulateSave(value, done) { setTimeout(done, 200); };
  window.onload = function () { createCounter(document, simulateSave); };
}
