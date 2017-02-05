const test = require('ava');
const jsdom = require('jsdom');

const createCounter = require('./counter');

const html = '<!doctype html><html><body></body></html>';
const startApplication = (saveCounter) => {
  const document = jsdom.jsdom(html);
  createCounter(document, saveCounter);
  return document;
};

const readCounterValue = (document) => {
  return parseInt(document.getElementById('counter').innerHTML, 10);
};

const clickIncreaseButton = document => {
  document.getElementById('increment').click();
};
const clickDecreaseButton = document => {
  document.getElementById('button2').click();
};

const callbackify = promiseFn => (err, done) => promiseFn()
  .then(value => done(null, value))
  .catch(error => done(err));
;

test('counter is 0 on load', t => {
  const document = startApplication();

  t.is(readCounterValue(document), 0);
});

test('increases the counter on click when server call succeeds', async t => {
  let saveCounterCalled;
  const saveCounter = (value, done) => {
    saveCounterCalled = Promise.resolve();
    done();
  };

  const document = startApplication(saveCounter);

  clickIncreaseButton(document);

  await saveCounterCalled;
  t.is(readCounterValue(document), 1);
});

test('does not increase the counter when saver call fails', async t => {
  let saveCounterCalled;
  const saveCounter = callbackify(() => {
    saveCounterCalled = Promise.reject();
    return saveCounterCalled;
  });

  const document = startApplication(saveCounter);
  clickIncreaseButton(document);

  try {
    await saveCounterCalled;
  }
  catch (e) {
    t.is(readCounterValue(document), 0);
  };
});

test('increases the count from 1 to 2', async t => {
  let saveCounterCalled;
  const saveCounter = callbackify(() => {
    saveCounterCalled = Promise.resolve();
    return saveCounterCalled;
  });

  const document = startApplication(saveCounter);
  clickIncreaseButton(document);
  await saveCounterCalled;
  clickIncreaseButton(document);
  await saveCounterCalled;

  t.is(readCounterValue(document), 2);
});

test('decreases the counter from 1 to 0', async t => {
  let saveCounterCalled;
  const saveCounter = callbackify(() => {
    saveCounterCalled = Promise.resolve();
    return saveCounterCalled;
  });

  const document = startApplication(saveCounter);
  clickIncreaseButton(document);
  await saveCounterCalled;
  clickDecreaseButton(document);
  await saveCounterCalled;

  t.is(readCounterValue(document), 0);
});
