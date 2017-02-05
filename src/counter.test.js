const test = require('ava');
const jsdom = require('jsdom');

const createCounter = require('./counter');

const html = '<!doctype html><html><body></body></html>';

const startApplication = (saveCounter) => {
  const document = jsdom.jsdom(html);
  createCounter(document, saveCounter);
  return document;
};

const readCounterValue = document => {
  return parseInt(document.getElementById('counter').innerHTML, 10);
};

const clickIncreaseButton = document => {
  document.getElementById('increment').click();
};

const clickDecreaseButton = document => {
  document.getElementById('button2').click();
};

const saveStub = (value, done) => {
  done(null);
};

const failingSaveStub = (err, done) => {
  done(new Error());
};

test('counter is 0 on load', t => {
  const document = startApplication();

  t.is(readCounterValue(document), 0);
});

test('increases the counter on click when server call succeeds', t => {
  const document = startApplication(saveStub);

  clickIncreaseButton(document);

  t.is(readCounterValue(document), 1);
});

test('does not increase the counter when saver call fails', t => {
  const document = startApplication(failingSaveStub);

  clickIncreaseButton(document);

  t.is(readCounterValue(document), 0);
});

test('increases the count from 1 to 2', t => {
  const document = startApplication(saveStub);

  clickIncreaseButton(document);
  clickIncreaseButton(document);

  t.is(readCounterValue(document), 2);
});

test('decreases the counter from 1 to 0', t => {
  const document = startApplication(saveStub);

  clickIncreaseButton(document);
  clickDecreaseButton(document);

  t.is(readCounterValue(document), 0);
});
