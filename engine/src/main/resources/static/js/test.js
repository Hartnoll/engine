'use strict';


// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;
const assert = require('assert');
const Stopwatch = require('../js/stopwatch');
const VimeoPlayer = require("@vimeo/player");
const jsdom = require('jsdom-global')();
let petrol = ["480865808", "480866073", "480866431", "480866534", "484084134", "484084340", "484084647", "484084941", "490413688", "490414048", "490451670"];
let diesel = ["534461934", "534464377", "534469083", "534471105", "534473103", "534475399", "534477657", "534479602", "534481812", "534483725", "534488837"];
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
describe('Player Tests', function() {
  it('Loads Petrol Videos Correctly', function () {
    var div = document.createElement('div')
    let options = {
      id: 480865808,
      muted: true
    };
    var player = new VimeoPlayer(div, options)
    for (var i = 0; i < petrol.length; i++) {
      player.loadVideo(petrol[i]);
      player.getVideoId().then(function(id) {
        assert.equal(id, petrol[i]);
      });
    }
  })
  it('Loads Diesel Videos Correctly', function () {
    var div = document.createElement('div')
    let options = {
      id: 480865808,
      muted: true
    };
    var player = new VimeoPlayer(div, options)
    for (var i = 0; i < diesel.length; i++) {
      player.loadVideo(diesel[i]);
      player.getVideoId().then(function(id) {
        assert.equal(id, diesel[i]);
      });
    }
  })
});

