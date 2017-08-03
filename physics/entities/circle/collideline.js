if(!Physics.Circle.prototype.collideLine) {
  Physics.Circle.prototype.collideLine = function(line) {
    var pos = this.pos;
    var vel = this.vel;
    var one = line.one;
    var two = line.two;
    
    if (one.x === two.x ||
      one.y === two.y) {
      return;
    }

    if (!Collision.circleCollidingLine(one, two, pos, this.rad + line.rad)) {
      return;
    }
    if (!Collision.intersecting(pos, Vector2.reflect(pos, one, two), one, two)) {
      var n = (Vector2.distSq(pos, one) < Vector2.distSq(pos, two)) ? one : two;
      this.vel = Vector2.mult(Vector2.sub(Vector2.reflect(Vector2.sub(pos, vel), n, pos), pos), line.bcf * this.bcf);
      this.pos = Vector2.sub(n, Vector2.mult(Vector2.normalize(Vector2.sub(n, pos)), this.rad + line.rad));
    } else {
      var n = Collision.intersection(pos, Vector2.reflect(pos, one, two), one, two);
      this.vel = Vector2.mult(Vector2.sub(n, Vector2.reflect(Vector2.sub(n, vel), n, Vector2.add(n, new Vector2(1, Equation.PM(one, two))))), -line.bcf * this.bcf);
      this.pos = Vector2.add(n, Vector2.mult(Vector2.normalize(new Vector2(1, Equation.PM(one, two))), (this.rad + line.rad) * (pos.y > n.y ? -1 : 1) * (one.x > two.x ? -1 : 1) * (one.y > two.y ? -1 : 1)));
    }
    this.trySleep();
  };
}