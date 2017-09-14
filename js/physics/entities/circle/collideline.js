if(!KAPhy.Physics.Circle.prototype.collideLine) {
  KAPhy.Physics.Circle.prototype.collideLine = function(line) {
    var pos = this.pos.canvasMap();
    var vel = this.vel.canvasMap();
    var one = line.one.canvasMap();
    var two = line.two.canvasMap();
    
    var prp = KAPhy.Physics.Vector2.sub(pos, vel);
    var pri = false;
    
    if (one.x === two.x ||
      one.y === two.y) {
      return;
    }

    if (!KAPhy.Physics.Collision.circleCollidingLine(one, two, pos, this.rad + line.rad)) {
      if(!KAPhy.Physics.Collision.intersecting(one, two, pos, prp)) {
        return;
      }
      else {
        pri = true;
      }
    }
    if (!KAPhy.Physics.Collision.intersecting(pos, KAPhy.Physics.Vector2.reflect(pos, one, two), one, two)) {
      var n = (KAPhy.Physics.Vector2.distSq(pos, one) < KAPhy.Physics.Vector2.distSq(pos, two)) ? one : two;
      this.vel = 
        KAPhy.Physics.Vector2.mult(
          KAPhy.Physics.Vector2.sub(
            KAPhy.Physics.Vector2.reflect(
              KAPhy.Physics.Vector2.sub(prp, vel),
            n, prp),
          prp), 
        line.bcf * this.bcf).canvasUnmap();
      this.pos = 
        KAPhy.Physics.Vector2.sub(n,
          KAPhy.Physics.Vector2.mult(
            KAPhy.Physics.Vector2.normalize(
              KAPhy.Physics.Vector2.sub(n, prp)
            ),
          this.rad + line.rad + 0.5)
        ).canvasUnmap();
    } else {
      var n = KAPhy.Physics.Collision.intersection(prp, KAPhy.Physics.Vector2.reflect(prp, one, two), one, two);
      this.vel = 
        KAPhy.Physics.Vector2.mult(
          KAPhy.Physics.Vector2.sub(n,
            KAPhy.Physics.Vector2.reflect(KAPhy.Physics.Vector2.sub(n, vel), n, KAPhy.Physics.Vector2.add(n, new KAPhy.Physics.Vector2(1, KAPhy.Physics.Equation.PM(one, two))))
          ),
        -line.bcf * this.bcf).canvasUnmap();
      this.pos = 
        KAPhy.Physics.Vector2.add(n,
          KAPhy.Physics.Vector2.mult(
            KAPhy.Physics.Vector2.normalize(
              new KAPhy.Physics.Vector2(1,
                KAPhy.Physics.Equation.PM(one, two)
              )
            ), 
          (this.rad + line.rad + 0.5) * (pos.y > n.y ? -1 : 1) * (one.x > two.x ? -1 : 1) * (one.y > two.y ? -1 : 1) * (pri ? -1 : 1))
        ).canvasUnmap();
    }
    this.trySleep();
  };
}