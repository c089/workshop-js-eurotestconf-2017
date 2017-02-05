var test = require('ava');

function add () {
  return 0;
}

test('my first test', function(t) {
  t.is(0, add(""));
});
