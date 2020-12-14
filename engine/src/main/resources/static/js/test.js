'use strict';

// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;
const ControlPanel = require('js/sketch');


// Create the variable you are going to test
let p5js = 42;


// describe lets you comment on what this block of code is for.
describe('these are testing the size of the window', function() {

    let controlPanel;

    beforeEach(function() {
        controlPanel = new ControlPanel();
    })

  // it() lets you comment on what an individual test is about.
  it('should be an object', function(done) {
    expect(controlPanel).to.be.a('object');
    done();
  });
});