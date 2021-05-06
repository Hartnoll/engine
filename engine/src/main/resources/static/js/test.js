'use strict';


// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;
const assert = require('assert');
const Stopwatch = require('../js/stopwatch');
const VimeoPlayer = require("@vimeo/player");
const Calculations = require("../js/calculations");
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
    try {
      second = stopwatch.getSeconds("hello");
    }
    catch(err) {
      assert.equal(err.message, "time must be a number")
    }
    try {
      second = stopwatch.getSeconds(true);
    }
    catch(err) {
      assert.equal(err.message, "time must be a number")
    }
    try {
      second = stopwatch.getSeconds(-1.234);
    }
    catch(err) {
      assert.equal(err.message, "time must be positive")
    }
    try {
      second = stopwatch.getSeconds(-0.04);
    }
    catch(err) {
      assert.equal(err.message, "time must be positive")
    }
    done();
  })

  it('getMilliseconds should return milliseconds element', function(done) {
    millisecond = stopwatch.getMilliseconds(2.345);
    assert.equal(millisecond, 35);
    millisecond = stopwatch.getMilliseconds(5.244);
    assert.equal(millisecond, 24);
    millisecond = stopwatch.getMilliseconds(3.0000);
    assert.equal(millisecond, 0);
    try {
      second = stopwatch.getMilliseconds("hello");
    }
    catch(err) {
      assert.equal(err.message, "time must be a number")
    }
    try {
      second = stopwatch.getMilliseconds(true);
    }
    catch(err) {
      assert.equal(err.message, "time must be a number")
    }
    try {
      second = stopwatch.getMilliseconds(-1.234);
    }
    catch(err) {
      assert.equal(err.message, "time must be positive")
    }
    try {
      second = stopwatch.getMilliseconds(-0.04);
    }
    catch(err) {
      assert.equal(err.message, "time must be positive")
    }
    done();
  })

  it('stopwatchTime should return correct formatted string', function(done) {
    var time = 1.234;
    var stopTime = stopwatch.stopwatchTime(stopwatch.getSeconds(time), stopwatch.getMilliseconds(time));
    assert.equal(stopTime, "0:01:23");
    time = 72.567;
    stopTime = stopwatch.stopwatchTime(stopwatch.getSeconds(time), stopwatch.getMilliseconds(time));
    assert.equal(stopTime, "1:12:56");
    time = 3.000000;
    stopTime = stopwatch.stopwatchTime(stopwatch.getSeconds(time), stopwatch.getMilliseconds(time));
    assert.equal(stopTime, "0:03:00");
    time = 125.245678;
    stopTime = stopwatch.stopwatchTime(stopwatch.getSeconds(time), stopwatch.getMilliseconds(time));
    assert.equal(stopTime, "2:05:25");
    time = 0.987;
    stopTime = stopwatch.stopwatchTime(stopwatch.getSeconds(time), stopwatch.getMilliseconds(time));
    assert.equal(stopTime, "0:00:99");
    done();
  })
});

describe('Calculation Tests', function() {
  var Calc = new Calculations();
  it('Checks fuel drop correctly', function() {
    assert.equal(Calc.fuelDrop(16), false);
    assert.equal(Calc.fuelDrop(15), true);
    assert.equal(Calc.fuelDrop(-1), false);
  })
  it('Checks fuel time correctly', function() {
    assert.equal(Calc.fuelTime(1234), false);
    assert.equal(Calc.fuelTime(15), true);
    assert.equal(Calc.fuelTime(-1), false);
  })
  it('Checks torque correctly', function() {
    assert.equal(Calc.torque(16, "P"), false);
    assert.equal(Calc.torque(23.5, "P"), true);
    assert.equal(Calc.torque(17.9, "P"), false);
    assert.equal(Calc.torque(33.5, "D"), false);
    assert.equal(Calc.torque(26, "D"), true);
  })
  it('Checks speed correctly', function() {
    assert.equal(Calc.speed(1400), true);
    assert.equal(Calc.speed(1500.23), false);
    assert.equal(Calc.speed(1800), true);
    assert.equal(Calc.speed(-234), false);
  })
  it('Checks if blank correctly', function() {
    assert.equal(Calc.isBlank(""), true);
    assert.equal(Calc.isBlank("hghghgh"), false);
    assert.equal(Calc.isBlank(1400), false);
  })
  it('Checks if number correctly', function() {
    assert.equal(Calc.isNumber("jgjgjgj"), false);
    assert.equal(Calc.isNumber(54), true);
    assert.equal(Calc.isNumber(56.3), true);
    assert.equal(Calc.isNumber(-3), true);
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

