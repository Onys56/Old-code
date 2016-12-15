var scl = 16;
var s;
var f;

function setup() {
    createCanvas(800, 800);
    s = new Snake();
    f = new Food();
    frameRate(16);
}

function draw() {
    background(51);
    eat();
    s.move();
    f.show();
    s.show();
}

function eat(){
    if (s.x == f.x && s.y == f.y) {
      f = new Food();
      console.log("eaten")
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    }
}
