'use strict';


// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;
const assert = require('assert');
const Stopwatch = require('../js/stopwatch');
let stopwatch;
let second;
let millisecond;
describe('Stopwatch tests', function() {
  stopwatch = new Stopwatch();
  it('getSeconds should return seconds element', function(done) {
    second = stopwatch.getSeconds(1.234);
    assert.equal(second, 1);
    second = stopwatch.getSeconds(5.567);
    assert.equal(second, 5);
    second = stopwatch.getSeconds(3.0);
    assert.equal(second, 3);
    done();
  })

  it('getMilliseconds should return milliseconds element', function(done) {
    millisecond = stopwatch.getMilliseconds(2.345);
    assert.equal(millisecond, 35);
    millisecond = stopwatch.getMilliseconds(5.244);
    assert.equal(millisecond, 24);
    millisecond = stopwatch.getMilliseconds(3.0000);
    assert.equal(millisecond, 0);
    done();
  })

});

