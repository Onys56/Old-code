var scl = 25;
var s;
var f;
var w = window.innerWidth;
var h = window.innerHeight;
canMove = true;
death = false;

function setup() {
    createCanvas(w, h);
    s = new Snake();
    f = new Food();
    frameRate(16);
}

function draw() {
    canMove = true;
    background(51);
    if (!death) {
      s.eat();
      s.move();
      s.death();
      f.show();
      s.show();
    } else {
      canMove = false;
      alert("Smrt!");
      gameReset();
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW && (s.xmove != 1 || s.x.length == 1) && canMove) {
        s.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW && (s.xmove != -1 || s.x.length == 1) && canMove) {
        s.dir(1, 0);
    } else if (keyCode === UP_ARROW && (s.ymove != 1 || s.x.length == 1) && canMove) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW && (s.ymove != -1 || s.x.length == 1) && canMove) {
        s.dir(0, 1);
    }
}

function gameReset() {
  s.x = [0];
  s.y = [0];
  s.xmove = 0;
  s.ymove = 0;
  document.getElementById('score').innerHTML="Score: 0";
  f.x = floor(random(0, width/scl));
  f.y = floor(random(0, height/scl));
  f.Food();
  s.score = 0;
  death = false;
}
