# Intro

This workshop consists of a set of exercises to practice using more modern
features of JavaScript. We're using the latest version of node.js and the ava
test runner, so we can use all the latest language features (except for the es6
module system). To reduce scope, I intentionally left out transpiling code for
browsers to minimize setup complexity and dependencies, but the web refactoring
example shows how to run unit tests for frontend code using jsdom on node.js.
You could also use this to get familiar with webpack2 as a module bundler.

- Find a pair partner and choose one of the exercises based on your skill level
  and learning goal
- After each session, change pair partners. Take a minute to explain to each
  other what you learned in the previous session, then pick a new exercise (or
  repeat the same, applying what your learned before)


|---------------------------|----------------------|------------------------------------------------------|
| Exercise                  | Focus                | Recommended for folks that know...                   |
|---------------------------|----------------------|------------------------------------------------------|
| TDD kata                  | Test-Driving code    | Basic JS                                             |
| ES.current: ES2014/ES2016 | Language Features    | Basic JS                                             |
| typechecked.ES: flow      | Static Type Checking | Basic JS                                             |
| ES.next: async / await    | Language Features    | Callback-style async programming                     |
| ES.web: refactoring       | Improving code       | Basic JS web development using callbacks and DOM API |
|---------------------------|----------------------|------------------------------------------------------|


## Installation and running tests

- Make sure you have the latest version of node.js (7.5.0 as time of writing)
- Clone this repository
- There are example tests for each exercise in the `src/` folder
- run `npm install` to install ava, a modern and simple test runner with support
  for the latest language features, and other dependencies
- use `npm test` to run the tests once and generate a coverage report in
  `coverage/index.html`
- use `npm run watch` to run tests on file changes for fast feedback
- magic asserts: In most case, you can just use `t.is` or `t.deepEqual` to write
  your assertions. Ava will usually produce useful error messages without
  specialized assertions.

## Resources

The following resources should help you with using latest language features:

- [Exploring ES6](http://exploringjs.com/es6.html)
- [Exploring ES2016 and ES2017](http://exploringjs.com/es2016-es2017.html)
- [es6katas](http://es6katas.org) as examples for the learning tests
  
# Exercises

## Unit testing and the TDD workflow

Exercise: 

- Follow the instructions of the [String Calculator kata](http://osherove.com/tdd-kata-1/)
- Write your tests in stringcalculator.test.js, which includes an example to get
  you started.
- The example deliberately does not use newer language features to be
  understandable for most JS programmers, but you can write your code using
  modern features if you like.
- Try to follow the TDD Workflow:
  1. Write a small test
  2. See it fail
  3. Write just enough code to make it pass
  4. Refactor as needed
  5. Repeat
  
## ECMAScript.current: Catching up on ECMAScript 2015 (ES6) and 2016

Recent ECMAScript releases brought a load of new features, making the language
more pleasant to work with. Most of the new things have been added with
ECMAScript2015, with a tiny update in 2016. Use the provided resources to
explore the new features, and write unit tests to document what you learned.

Some features I enjoy and recommend learning about: arrow functions,
block-scoped bindings (let and const), Promises, destructuring.

### Exercise

- Write learning tests to explore ECMAScript 2016/2016 features.
- A starting point is provided in es2016.test.js.
- With the test setup in this repository, you can use and learn about all
  features up to ES2016, except for the module system (`import`/`export`).
- If you're struggling to come up with test cases, see es6katas for examples

## ES.next: async/await

Part of JavaScript's bad reputation still comes from "callback hell" code like this:

```js
const doSomething = function (done) {
  someAsyncFunction(function (err, a) {
    if(err) done(err);
    someOtherAsyncThing(function (err2, b) {
      if(err2) done(err2);
      done(b);
    });
  });
}
```

With ES2015, a standardized `Promise` is part of the language and async
functions are a new feature built on top, which allow to write async code in a
much more concise style. The feature has recently been promoted to stage-4,
making it likely to become part ES2017. We can already use it with the testing
stack in this repository.

Exercise:

- Use [this introduction](http://exploringjs.com/es2016-es2017/ch_async-functions.html)
  to learn about async functions and document what you learn using tests.
- A starting point is provided in `es2017.test.js`.
- Once you're comfortable with async functions, try using them to refactor the
  code in the refactoring exercise
  
## typechecked.ES: Checking out flow

JavaScript can be fun. For example, what is the value of each of the following?

```
[] + [];
[] + {};
{} + [];
{} + {};
Array(16).join("wat" + 1);
Array(16).join("wat" - 1) + "Batman";
```

(If you don't know these from the classic talk "wat" by Gary Bernhardt, feel
free to write a test for each with your assumption, and see if you're right ;))

While all of these are valid per specification, we can immediately see that
adding an array to an object doesn't make sense because they have different
types. But in reality, this kind of error is much more sneaky because our values
aren't in plain sight, but hidden behind variables and function calls. `f(x) +
g(y)` seems fine until you consider one of those functions may return an object,
the other an array.

Let's try out static type checking with flow. If you've never worked with a
language using static type checks, this means that a special program (usually
the compiler, in our case a specialized utility, flow) will analyze your code
without running it, to see if there's any type errors. To do this, it needs to
know what the types in your code are. Flow is pretty good at figuring this out
on it's own in many cases (e.g. in `const x = 1 + 2` it can infer that `x` must
be of type `Number` and remember that for when other code uses x), but not
always. In that case (and for other reasons, such as documentation), you will
need to add the type information yourself using special syntax, e.g. you could
write this instead : `const x: Number = 1 + 2`).

See [Getting Started with flow](https://flowtype.org/docs/getting-started.html)
and the rest of the flow documentation for more.

Exercise:

- You can type-check the code in this repository using `npm run typecheck`. It
  starts a server the first time, which will take a few seconds, but it should
  give very fast feedback when you run it after that.
- Only files that opt-in using a `@flow` comment will be checked.
- Check out `wat.js` and see what flow does with each of these examples
- If you've written code today, try adding the `@flow` comment to your files and
  see if flow catches errors you didn't - or maybe flags things that are
  correct?
- Discuss with your pair partner the benefits an drawbacks of this and how it
  relates to testing your code with unit tests

## ES.web: Refactoring a web application

In `counter.js` you find a tiny web application: It only shows a counter with
buttons to increment and decrement it. Before the counter is updated, the new
value should be persisted to a server, and only of that suceeds should the
counter be updated. It is covered by tests in `counter.test.js`, but the
implementation is (intentionally) quite a mess already so we need to refactor
before adding new features.

### Example refactorings

- extract variables with meaningful names
- upgrade to ES6 syntax, e.g. arrow functions and const bindings
- refactor from callbacks to ES2015 promises or ES2017 async/await
- decouple the application, e.g. separate the state management from the view
  layer. if you know libraries like React.js which would help you with that,
  feel free to include them
  
