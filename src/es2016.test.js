var test = require('ava');

test('arrow functions can have implicit returns', function (t) {
  var keywordSum = function (a, b) { return a + b; };
  var arrowSum   =          (a, b) =>       a + b;

  t.is(3, keywordSum(1, 2));
  t.is(3, arrowSum(1, 2));
});
