'use strict';


// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;
const assert = require('assert');
const Stopwatch = require('../js/stopwatch');
let stopwatch;
let second;
describe('stopwatch tests', function() {
  stopwatch = new Stopwatch();
  it('should get seconds', function(done) {
    second = stopwatch.getSeconds(1.234);
    assert.equal(second, 1);
    done();
  })

})

