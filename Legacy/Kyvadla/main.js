var ratios = [[1,1], [1,-1]];

function setup() {
  width = 1000;
  scale = 20;
  t = 0;
  h = 500;
  manualIncrement = 0;
  createCanvas(width, 800);
  sliderS = createSlider(0,0.2,0.05,0.0025);
  sliderS.position(450, 27);
  sliderS.class('slider');
  sliderM = createSlider(0,1,0,0.05);
  sliderM.position(450, 72);
  sliderM.class('slider');
  speed = createElement('strong', 'Rychlost:')
  speed.class('text');
  modes = createElement('strong', 'Módy:');
  modes.class('text');
  modesl = createElement('p','x=y');
  modesr = createElement('p','x=-y');
  modesl.class('text');
  modesr.class('text');
  x = new Kyvadlo(700, h, 0);
  y = new Kyvadlo(300, h, 1);
}

function draw() {
  translate(0, 100);
  engine();
  visual();
}

function engine() {
  mode1 = 50*(1-sliderM.value());      // x=y
  mode2 = 50*sliderM.value();        // y=-y
  x.pos();
  y.pos();
  t = t + sliderS.value() + manualIncrement;
}

function visual() {
  background(51);
  noStroke()
  fill('black');                      //top
  rect(0,-100,width,100);              //top
  speed.position(468, 7);
  modes.position(477, 52);
  modesl.position(417, 47);
  modesr.position(567, 47);
  modesl.elt.innerHTML = "x=y<br> " + round(100*(1-sliderM.value()))/100;
  modesr.elt.innerHTML = "x=-y<br> " + sliderM.value();
  x.show();
  y.show();
  stroke('black');
  strokeWeight((x.defx-y.defy)/(x.x-y.x));
  line((x.x+x.defx)/2,x.y/2,(y.x+y.defx)/2,y.y/2);
}
