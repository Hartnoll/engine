const SIZE = 400;
const x = SIZE / 2;
const y = SIZE / 2;
const r = SIZE / 5;
var speeds = ["1400","1500","1600", "1700", "1800", "1900", "2000","2100","2200","2300","2400", "----"];
var id = ["480865808", "480866073", "480866431", "480866534", "484084134", "484084340", "484084647", "484084941", "", "", "", ""];
var count = speeds.length - 1;
var w = window.innerWidth;
var h = window.innerHeight;
let myFont;
document.getElementsByTagName("BODY")[0].onresize = function() {myFunction()};

function setup() {
  let w = window.outerWidth;
  let h = window.outerHeight;
  let cnv = createCanvas(w/2, h/2);
  cnv.position(w/2,0);
  /*button = createButton('play');
  button.position(x, y + r + 40);
  button.mousePressed(play);*/
}

function preload() {
  myFont = loadFont('js/digital-7.ttf');
}

function draw() {
  background(230);
  push();
  fill('silver');
  translate(x,y);
  ellipse(0,0,2*r,2*r);
  pop();
  push();
  fill('black')
  translate(x,y);
  ellipse(0,0,r,r);
  pop();
  push();
  fill(0);
  rect(x - (SIZE / 10), y - r -((SIZE/10)*1.3),(SIZE / 10) * 2,(SIZE / 10))
  pop();
  fill('red');
  textAlign(CENTER);
  textSize(SIZE / 10);
  textFont(myFont);
  text(speeds[count], x, y - r - 20)
  push();
  stroke('black');
  strokeWeight(2);
  var angle = ((2*PI) / speeds.length) * (count + 1);
  line(x, y, (x + (r * sin(angle))), (y - (r *cos(angle))));
  pop();
}


function mousePressed() {
  if (dist(mouseX,mouseY, x, y) < r) {
    count ++;
    if (count > (speeds.length -1) ){
      count = 0;
    }
  var video = document.getElementById("video");
    video.src = "https://player.vimeo.com/video/".concat(id[count]);
    video.contentDocument.location.reload(true);

  }
}