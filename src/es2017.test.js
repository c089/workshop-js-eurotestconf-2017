const test = require('ava');

test('ES2017: Object.values()', t => {
  const o = {x:1, y:2};
  t.deepEqual(Object.values(o), [1, 2]);
});

const asyncFunction = async () => 1;

test('async functions return promises', t => {
  const promise = asyncFunction();
  t.is(true, promise instanceof Promise);
});

test('we can await the value of the promise', async t => {
  const value = await asyncFunction();
  t.is(1, value);
});
