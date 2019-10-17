function Food() {
  this.x = floor(random(0, width/scl));
  this.y = floor(random(0, height/scl));

  this.show = function() {
    fill('red');
    noStroke();
    translate(scl/2,scl/2);
    ellipse(this.x*scl, this.y*scl, scl, scl);
  }
}
