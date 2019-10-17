function Kyvadlo(defx, defy, i) {
  this.defx = defx;
  this.defy = defy;
  this.x = defx;
  this.y = defy;
  this.degT = createElement('strong','Odchylka: ');
  this.delX = createElement('strong','Δx: ');
  this.delY = createElement('strong','Δy: ');
  this.degT.position(defx-60, 20);
  this.delX.position(defx-60, 37);
  this.delY.position(defx-60, 54);

  this.show = function() {
    stroke('grey');
    strokeWeight(1);
    line(defx, 0, this.x, this.y);
    fill('red');
    noStroke();
    ellipse(this.x,this.y,scale,scale);
    this.stats();
  }

  this.stats = function() {
    fill('gray');
    stroke('white');
    rectMode(CENTER);
    rect(defx, -50, 150, 80, 20)
    rectMode(CORNER);
    this.degT.elt.innerHTML = "Odchylka: " + floor(100*degrees(atan(this.spot/defy)))/100 + '°';
    this.delX.elt.innerHTML = "Δx: " + floor(100*(this.x-this.defx))/100;
    this.delY.elt.innerHTML = "Δy: " + floor(100*(this.y-this.defy))/100;
  }

  this.pos = function() {
    this.spot = ratios[i][0]*mode1*sin(t) + ratios[i][1]*mode2*sin(0.95*t);
    this.y = defy*cos(atan(this.spot/defy));
    this.x = defx + this.spot - (defy-this.y)*this.spot/defy;
  }
}
