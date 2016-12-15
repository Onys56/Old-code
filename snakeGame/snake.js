function Snake() {
    this.x = [0];
    this.y = [0];
    this.xmove = 0;
    this.ymove = 0;

    this.dir = function(x, y) {
        this.xmove = x;
        this.ymove = y;
    }
    this.move = function() {
            if (this.x[0] == floor(width / scl)) {
                this.x[0] = 0;
            } else if (this.x[0] == -1) {
                this.x[0] = floor(width / scl) - 1
            } else if (this.y[0] == floor(height / scl)) {
                this.y[0] = 0
            } else if (this.y[0] == -1) {
                this.y[0] = floor(height / scl) - 1
            } else {
                this.x[0] = this.x[0] + this.xmove;
                this.y[0] = this.y[0] + this.ymove;
            }
    }
    this.eat = function() {
      if (this.x[0] == f.x && this.y[0] == f.y) {
          f = new Food();
          this.score
          document.getElementById('score').innerHTML="Score: " + this.x.length;
          this.x.push(this.newx);
          this.y.push(this.newy);
      }
      for(var i = this.x.length;i > 1;i--) {
          this.x[i-1] = this.x[i-2];
          this.y[i-1] = this.y[i-2];
        }
      this.newx = this.x[this.x.length-1];
      this.newy = this.y[this.y.length-1];
      }
    this.show = function() {
        fill(255);
        stroke(51);
        translate(-scl / 2, -scl / 2);
        for(var i = 0; i < this.x.length; i++){
          rect(this.x[i] * scl, this.y[i] * scl, scl, scl);
        }
    }

}
