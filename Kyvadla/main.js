var slider;

function setup() {
  width = 1000;
  scale = 20;
  t = 0;
  h = 500;
  manualIncrement = 0;
  mode1 = 40;      // x=y
  mode2 = 40;      // y=-y
  createCanvas(width, 800);
  slider = createSlider(0,0.2,0.05,0.0025);
  slider.position(450, 35);
  slider.id('slider');
  speed = createElement('strong', 'Rychlost:')
  speed.id('speed');
  x = new Kyvadlo(700, h, mode1, mode2);
  y = new Kyvadlo(300, h, mode1, -mode2);
}

function draw() {
  translate(0, 100);
  engine();
  visual();
}

function engine() {
  x.pos();
  y.pos();
  t = t + slider.value() + manualIncrement;
}

function visual() {
  background(51);
  noStroke()
  fill('black');                      //top
  rect(0,-100,width,100);              //top
  speed.position(468, 10);
  x.show();
  y.show();
  stroke('black');
  strokeWeight((x.defx-y.defy)/(x.x-y.x));
  line((x.x+x.defx)/2,x.y/2,(y.x+y.defx)/2,y.y/2);
}
