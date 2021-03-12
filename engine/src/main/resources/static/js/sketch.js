let SIZE = window.innerWidth / 3;
let cnv;
let x = window.innerWidth / 8;
let y;
let r = SIZE / 5;
let speeds = ["1400","1500","1600", "1700", "1800", "1900", "2000","2100","2200","2300","2400"];
let petrol = ["480865808", "480866073", "480866431", "480866534", "484084134", "484084340", "484084647", "484084941", "490413688", "490414048", "490451670"];
let id = petrol;
let diesel = ["480865808", "480866073", "480866431", "480866534", "484084134", "484084340", "484084647", "484084941", "490413688", "490414048", "490451670"];
let count = 0;
let paused = true;
let myFont;
let time = 0;
let rivRad = SIZE / 15;
let w = window.innerWidth;
let h;
let button;
let playButton;
let pauseButton;
let clearButton;
let resetButton;
let addRowButton;
let stopPaused = true;
let timer;
let buffering;
let stopwatchFunctions = new StopwatchFunctions();
let fuel = 1;
var options = {
  id: 480865808,
  width: window.innerWidth / 2,
  controls: false,
  muted: true
};
let player = new Vimeo.Player('fuel_panel', options);


function preload() {
  myFont = loadFont('js/digital-7.ttf');
}

function playPause() {
  if (paused) {
    paused = false;
    player.play();
  }else {
    paused = true;
    player.pause();
  }
}

// function stopwatchTime(seconds, milliseconds) {
//   let minutes;
//   let tenSeconds;
//   let units;
//   let tenthSeconds;
//   let hundredthSeconds;
//   minutes = (Math.floor(seconds / 60)).toString();
//   tenSeconds = (Math.floor((seconds % 60)/10)).toString();
//   units = ((seconds % 60)%10).toString();
//   tenthSeconds = (Math.floor(milliseconds / 10)).toString();
//   hundredthSeconds = (Math.floor(milliseconds % 10)).toString();
//   return minutes.concat(":".concat(tenSeconds).concat(units.concat(":".concat(tenthSeconds.concat(hundredthSeconds)))));
// }


function draw() {
  background(230);
  push();
  fill('silver');
  ellipse(x,y,2*r,2*r);
  pop();
  push();
  fill('black');
  ellipse(x + w/8, y, r/2, r/2);
  pop();
  push();
  stroke('silver');
  strokeWeight(2);
  var angle = fuel * PI/4;
  line(x + w/8, y, (x + w/8 + (r/4 * sin(angle))), (y - (r/4 *cos(angle))));
  pop();
  push();
  fill('black');
  textAlign(CENTER);
  textSize(SIZE/25);
  text("D", x + w/8 - r/4, y - r/4);
  text("P", x + w/8 + r/4, y - r/4);
  pop();
  push();
  fill('black');
  ellipse(x,y,r,r);
  pop();
  push();
  fill(0);
  ellipse(x + w/4,y, 2*r, 2*r);
  pop();
  push();
  fill('white');
  ellipse(x + w/4, y, 2*r - 10, 2*r - 10);
  pop();
  push();
  fill('red');
  textAlign(CENTER);
  textSize(SIZE / 10);
  textFont(myFont);
  let stopTime = stopwatchFunctions.stopwatchTime(stopwatchFunctions.getSeconds(time), stopwatchFunctions.getMilliseconds(time));
  text(stopTime[0], x + w/4 - (3*SIZE/25), y);
  text(stopTime[1], x + w/4 - (2*SIZE/25), y);
  text(stopTime[2], x + w/4 - (SIZE/25), y);
  text(stopTime[3], x + w/4, y);
  text(stopTime[4], x + w/4 + (SIZE/25), y);
  text(stopTime[5], x + w/4 + (2*SIZE/25), y);
  text(stopTime[6], x + w/4 + (3*SIZE/25), y);
  pop();
  push();
  fill(0);
  rect(x - (SIZE / 10), y - r -((SIZE/10)*1.3),(SIZE / 10) * 2,(SIZE / 10));
  pop();
  fill('red');
  push();
  textAlign(CENTER);
  textSize(SIZE / 10);
  textFont(myFont);
  text(speeds[count], x, y - r -((SIZE/10)*1.3) + (SIZE/11));
  pop();
  push();
  stroke('black');
  strokeWeight(1);
  var angle = ((2*PI) / speeds.length) * (count + 1);
  line(x, y, (x + (r * sin(angle))), (y - (r *cos(angle))));
  pop();
  push();
  fill(0);
  rect(x + w/4 + r, y -10, 10, 20);
  pop();
  drawRivet(rivRad, rivRad);
  drawRivet(rivRad, h - rivRad);
  drawRivet(w/2 - rivRad, rivRad);
  drawRivet(w/2-rivRad, h - rivRad);
}

function drawRivet(xCoord, yCoord) {
  fill('gray');
  ellipse(xCoord, yCoord, rivRad, rivRad);
  line(xCoord, yCoord + rivRad/2, xCoord, yCoord - rivRad/2);
}

// function getSeconds(time) {
//   return Math.trunc(time);
// }
//
// function getMilliseconds(time) {
//   var decimal = time % 1;
//   return (100 *(decimal).toFixed(2))
// }

var timeChange = function(data) {
  time = data.seconds;
  redraw();
};

function mousePressed() {
  if (dist(mouseX,mouseY, x, y) < r) {
    if (mouseX - x < 0) {
      count --;
      if (count < 0) {
        count = speeds.length -1;
      }
    }
    else {
      count++;
      if (count > (speeds.length - 1)) {
        count = 0;
      }
    }
  player.loadVideo(id[count])
  }
  if (dist(mouseX,mouseY, x + w/8, y) < r/4) {
    fuel = fuel * -1;
    if (fuel < 0) {
      id = diesel;
    }else {
      id = petrol;
    }
    player.loadVideo(id[count])
  }
}

function stopwatch() {
  time = time + 0.01;
  redraw();
}

function playStopwatch() {
  if (stopPaused) {
    stopPaused = false;
    timer = setInterval(stopwatch, 10);
  }
}

function pauseStopwatch() {
  if (!stopPaused) {
    clearInterval(timer);
    stopPaused = true;
  }
}


function resetStopwatch() {
  time = 0;
}


player.ready().then(function() {
  cnv = createCanvas(w/2, document.getElementById('fuel_panel').offsetHeight);
  cnv.position(w / 2,0);
  h = document.getElementById('fuel_panel').offsetHeight;
  y = h/2;
  button = createButton('Download Excel Sheet');
  addRowButton = createButton('Add Row');
  clearButton = createButton('Clear Table');
  playButton = createImg('play.png');
  pauseButton = createImg('pause.png');
  resetButton = createImg('reset.png');
  alterButton();
  button.mousePressed(function() {
    table.download("xlsx", "engine-data.xlsx", {sheetName:"My Data"});
  });
  addRowButton.mousePressed(function () {
    table.addRow({})
  });
  clearButton.mousePressed(function () {
    table.clearData();
  });
  playButton.mousePressed(playStopwatch);
  pauseButton.mousePressed(pauseStopwatch);
  resetButton.mousePressed(resetStopwatch);
});

function alterButton() {
  button.style("font-size", SIZE/10);
  button.size(SIZE/5, SIZE/10);
  button.position((3 * w) / 4 - (button.width)/2, y + r);
  addRowButton.style("font-size", SIZE/15);
  addRowButton.size(SIZE/5, SIZE/12);
  addRowButton.position((3 * w) / 4 + SIZE/45, y + r + SIZE/9);
  clearButton.style("font-size", SIZE/15);
  clearButton.size(SIZE/5, SIZE/12);
  clearButton.position((3 * w) / 4 - addRowButton.width - SIZE/45, y + r + SIZE/9);
  playButton.size(SIZE/10,SIZE/10);
  playButton.position(w/2 + w/8 + w/4 - SIZE/9, y - r - SIZE/10);
  pauseButton.size(SIZE/10,SIZE/10);
  pauseButton.position(w/2 + w/8 + w/4, y - r - SIZE/10);
  resetButton.size(SIZE/10, SIZE/10);
  resetButton.position(w/2 + w/8 + w/4 - SIZE/18, y - r - 2*SIZE/10);
}

var onBuffer = function(data) {
  if (!stopPaused) {
    buffering = true;
  }
  pauseStopwatch();
};
var offBuffer = function(data) {
  if (buffering) {
    playStopwatch();
    buffering = false;
  }
};

player.on('bufferstart', onBuffer);
player.on('bufferend', offBuffer);

/*
function windowResized() {
  //Works for resizing vimeo but causes problems with p5 canvas
  player.destroy().then(function() {
    let options = {
      id: id[count],
      width: window.innerWidth / 2,
      controls: false,
      muted: true
    };
    player = new Vimeo.Player('fuel_panel', options);
  });
  player.ready().then(function() {
    w = window.innerWidth;
    player.w = w/2;
    resizeCanvas(w/2, document.getElementById('fuel_panel').offsetHeight);
    cnv.position(w / 2,0);
    h = document.getElementById('fuel_panel').offsetHeight;
    y = h/2;
    x = window.innerWidth / 8;
    SIZE = window.innerWidth / 3;
    r = SIZE / 5;
    rivRad = SIZE/15;
    alterButton();
  });
}*/




