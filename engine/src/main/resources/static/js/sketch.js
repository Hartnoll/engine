let SIZE = window.innerHeight / 2;
let x = window.innerWidth / 8;
let y;
let r = SIZE / 5;
let speeds = ["1400","1500","1600", "1700", "1800", "1900", "2000","2100","2200","2300","2400"];
let id = ["480865808", "480866073", "480866431", "480866534", "484084134", "484084340", "484084647", "484084941", "490413688", "490414048", "490451670"];
let count = 0;
let paused = true;
let myFont;
let time = 0;
let rivRad = 20;
let w = window.innerWidth;
let h;
var options = {
  id: 480865808,
  width: window.innerWidth / 2,
  controls: false,
  muted: true
}
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

function draw() {
  background(230);
  push();
  fill('silver');
  translate(x,y);
  ellipse(0,0,2*r,2*r);
  pop();
  push();
  fill('black');
  translate(x,y);
  ellipse(0,0,r,r);
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
  text(getSeconds(time).toString().concat(":".concat(getMilliseconds(time).toString())), x + w/4, y);
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
  text(speeds[count], x, y - r - 20);
  pop();
  push();
  stroke('black');
  strokeWeight(2);
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

function getSeconds(time) {
  return Math.trunc(time);
}

function getMilliseconds(time) {
  var decimal = time % 1;
  return (100 *(decimal).toFixed(2))
}

var timeChange = function(data) {
  time = data.seconds;
  redraw();
}

function mousePressed() {
  if (dist(mouseX,mouseY, x, y) < r) {
    count ++;
    if (count > (speeds.length -1) ){
      count = 0;
    }
  player.loadVideo(id[count])

  }
}

player.ready().then(function() {
  var cnv = createCanvas(w/2, document.getElementById('fuel_panel').offsetHeight);
  cnv.position(w / 2,0);
  h = document.getElementById('fuel_panel').offsetHeight;
  y = h/2;
  let button = createButton('Start/Stop');
  button.position((3 * w) / 4 - (button.width)/2, y - button.height);
  button.mousePressed(playPause);
  player.on('timeupdate', timeChange);
  player.on('ended', timeChange);
});

function windowResized() {
  w = window.innerWidth;
  player.w = w/2;
  resizeCanvas(w/2, document.getElementById('fuel_panel').offsetHeight);
  cnv.position(w / 2,0);
  h = document.getElementById('fuel_panel').offsetHeight;
  y = h/2;
  x = window.innerWidth / 8;
  SIZE = window.innerHeight / 2;
  r = SIZE / 5;
}


