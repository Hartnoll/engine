let SIZE = window.innerWidth / 3;
let cnv;
let x = window.innerWidth / 8;
let y;
let r = SIZE / 5;
let speeds = ["1400","1500","1600", "1700", "1800", "1900", "2000","2100","2200","2300","2400"];
let petrol = ["480865808", "480866073", "480866431", "480866534", "484084134", "484084340", "484084647", "484084941", "490413688", "490414048", "490451670"];
let id = petrol;
let diesel = ["534461934", "534464377", "534469083", "534471105", "534473103", "534475399", "534477657", "534479602", "534481812", "534483725", "534488837"];
let count = 0;
let paused = true;
let myFont;
let time = 0;
let rivRad = SIZE / 15;
let w = window.innerWidth;
let h;
let helpFont;
let button;
let playButton;
let pauseButton;
let clearButton;
let resetButton;
let addRowButton;
let helpButton;
let gasImg;
let help = false;
let stopPaused = true;
let timer;
let ratio = 16/9;
let buffering;
let stopwatchFunctions = new StopwatchFunctions();
let fuel = 1;
let options = {
  id: 480865808,
  width: window.innerWidth / 2,
  muted: true
};
let player = new Vimeo.Player('fuel_panel', options);

function preload() {
  myFont = loadFont('js/digital-7.ttf');
  helpFont = loadFont('js/typewriter.ttf');
}

function setup() {
  cnv = createCanvas(w/2, (w/2) / ratio);
  cnv.position(w / 2,0);
  h = (w/2) / ratio;
  y = h/2;
  button = createButton('Download Excel Sheet');
  addRowButton = createButton('Add Row');
  clearButton = createButton('Clear Table');
  playButton = createImg('play.png');
  pauseButton = createImg('pause.png');
  resetButton = createImg('reset.png');
  helpButton = createImg('help.png');
  gasImg = createImg((1400 + count).toString() + ' P Set 1 Gas.jpg');
  alterButton();
  button.mousePressed(function() {
    table.download("xlsx", "engine-data.xlsx", {sheetName:"My Data"});
  });
  addRowButton.mousePressed(function () {
    table.addRow({})
  });
  clearButton.mousePressed(function () {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        table.clearData();
        Swal.fire(
            'Cleared!',
            'The table has been cleared',
            'success'
        )
      }
    })
  });
  playButton.mousePressed(playStopwatch);
  pauseButton.mousePressed(pauseStopwatch);
  resetButton.mousePressed(resetStopwatch);
  helpButton.mousePressed(function() {
    if (help) {
      help = false;
    }else {
      help = true;
    }
  });
}

function draw() {
  h = (w/2) / ratio;
  y = h/2;
  if (dist(mouseX,mouseY, x, y) < r) {
    cursor('pointer');
  } else if (dist(mouseX,mouseY, x + w/8, y) < r/4) {
    cursor('pointer');
  } else {
    cursor('default');
  }
  background(230);
  //Draws gas analyser box
  push();
  fill('black');
  rect(x + SIZE/4.3, y - SIZE/3.175, SIZE/3.5, SIZE/5.5);
  pop();
  push();
  //Draws speed dial outer
  fill('silver');
  ellipse(x,y,2*r,2*r);
  pop();
  push();
  //Draws petrol switch
  fill('black');
  ellipse(x + w/8, y, r/2, r/2);
  pop();
  push();
  //Draws petrol switch line
  stroke('silver');
  strokeWeight(2);
  var angle = fuel * PI/4;
  line(x + w/8, y, (x + w/8 + (r/4 * sin(angle))), (y - (r/4 *cos(angle))));
  pop();
  push();
  //Fuel letters
  fill('black');
  textAlign(CENTER);
  textSize(SIZE/25);
  text("D", x + w/8 - r/4, y - r/4);
  text("P", x + w/8 + r/4, y - r/4);
  pop();
  push();
  fill('black');
  //Speed switch inner
  ellipse(x,y,r,r);
  pop();
  push();
  fill(0);
  //Stopwatch black
  ellipse(x + w/4,y, 2*r, 2*r);
  pop();
  push();
  fill('white');
  //Stopwatch white
  ellipse(x + w/4, y, 2*r - r/10, 2*r - r/10);
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
  text(speeds[count], x, y - r -((SIZE/10)*1.3) + (SIZE/12));
  pop();
  push();
  stroke('black');
  strokeWeight(1);
  var angle = ((2*PI) / speeds.length) * (count + 1);
  line(x, y, (x + (r * sin(angle))), (y - (r *cos(angle))));
  pop();
  push();
  fill(0);
  rect(x + w/4 + r, y -r/10, r/10, r/5);
  pop();
  drawRivet(rivRad, rivRad);
  drawRivet(rivRad, h - rivRad);
  drawRivet(w/2 - rivRad, rivRad);
  drawRivet(w/2-rivRad, h - rivRad);
  if (help) {
    push();
    textSize(SIZE / 35);
    textFont(helpFont);
    textAlign(CENTER);
    fill('Blue');
    text("-\nSpeed", x - (r*0.75), y);
    text("+\nSpeed", x + (r*0.75), y);
    text("Change fuel", x + w/8, y + r/2);
    text("Stopwatch\nControls", x + w/4 - (r*0.8), y - (1.9*r));
    text("Toggle\nhelp", w/2 - 1.8*(SIZE / 10), h - SIZE/10 - (1.2*rivRad));
    text("Table\nControls",x + w/8 - SIZE /5,y + (1.2 * r));
    pop();
  }
}

function drawRivet(xCoord, yCoord) {
  fill('gray');
  ellipse(xCoord, yCoord, rivRad, rivRad);
  line(xCoord, yCoord + rivRad/2, xCoord, yCoord - rivRad/2);
}

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
    player.loadVideo(id[count]);
  }
  if (dist(mouseX,mouseY, x + w/8, y) < r/4) {
    fuel = fuel * -1;
    if (fuel < 0) {
      id = diesel;
    }else {
      id = petrol;
    }
    player.loadVideo(id[count])
  }-
  gasImg.remove();
  if (fuel > 0) {
    gasImg = createImg((1400 + (100*count)).toString() + ' P Set 1 Gas.jpg');
  }else {
    gasImg = createImg((1400 + (100*count)).toString() + ' D Set 1 Gas.jpg');
  }
  alterButton();
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

function alterButton() {
  button.style("font-size", SIZE/10);
  button.size(SIZE/5, SIZE/10);
  button.position((3 * w) / 4 - (button.width)/2, y + r);
  addRowButton.style("font-size", SIZE/30);
  addRowButton.size(SIZE/5, SIZE/12);
  addRowButton.position((3 * w) / 4 + SIZE/45, y + r + SIZE/9);
  clearButton.style("font-size", SIZE/30);
  clearButton.size(SIZE/5, SIZE/12);
  clearButton.position((3 * w) / 4 - addRowButton.width - SIZE/45, y + r + SIZE/9);
  playButton.size(SIZE/10,SIZE/10);
  playButton.position(w/2 + w/8 + w/4 - SIZE/9, y - r - SIZE/10);
  pauseButton.size(SIZE/10,SIZE/10);
  pauseButton.position(w/2 + w/8 + w/4, y - r - SIZE/10);
  resetButton.size(SIZE/10, SIZE/10);
  resetButton.position(w/2 + w/8 + w/4 - SIZE/18, y - r - 2*SIZE/10);
  helpButton.size(SIZE/15, SIZE/15);
  helpButton.position(w - SIZE / 10, h - SIZE/10 - (rivRad*1.5));
  gasImg.size(SIZE/4, SIZE/6);
  gasImg.position(3*(w/4) - SIZE/8, y - SIZE/3.25);
  gasImg.style('cursor', 'default');
  gasImg.style('border-radius', '10px');
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




