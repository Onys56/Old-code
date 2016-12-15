function Snake() {
    this.x = 0;
    this.y = 0;
    this.xmove = 0;
    this.ymove = 0;

    this.dir = function(x, y) {
      this.xmove = x;
      this.ymove = y;
    }
    this.move = function() {
        if (this.x == width/scl) {this.x = 0;}
        else if (this.x == -1) {this.x = width/scl-1}
        else if (this.y == height/scl) {this.y = 0}
        else if (this.y == -1) {this.y = height/scl-1}
        else {
          this.x = this.x + this.xmove;
          this.y = this.y + this.ymove;
       }
    }
    this.show = function() {
        fill(255);
        translate(-scl/2,-scl/2);
        rect(this.x * scl, this.y * scl, scl, scl);
    }

}
