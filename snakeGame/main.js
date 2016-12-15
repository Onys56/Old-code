var scl = 25;
var s;
var f;
var w = window.innerWidth;
var h = window.innerHeight;

function setup() {
    createCanvas(w, h);
    s = new Snake();
    f = new Food();
    frameRate(16);
}

function draw() {
    background(51);
    s.eat();
    s.move();
    f.show();
    s.show();
    console.log(w + " a " + h)
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
