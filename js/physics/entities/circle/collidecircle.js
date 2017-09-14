if(!KAPhy.Physics.Circle.prototype.collideStaticDynamic) {
  KAPhy.Physics.Circle.prototype.collideStaticDynamic = function(that) {
    that.pos = KAPhy.Physics.Vector2.lerp(
      that.pos.canvasMap(),
      KAPhy.Physics.Vector2.add(this.pos.canvasMap(),
        KAPhy.Physics.Vector2.mult(
          KAPhy.Physics.Vector2.normalize(
            KAPhy.Physics.Vector2.sub(that.pos.canvasMap(), this.pos.canvasMap())
          ),
          this.rad + that.rad)
      ),
      KAPhy.Physics.circleAdjustment
    ).canvasUnmap();
    that.vel = KAPhy.Physics.Vector2.mult(
      KAPhy.Physics.Vector2.sub(
        KAPhy.Physics.Vector2.reflect(
          KAPhy.Physics.Vector2.sub(that.pos.canvasMap(), that.vel.canvasMap()),
          this.pos.canvasMap(), that.pos.canvasMap()),
        that.pos.canvasMap()),
      this.bcf * that.bcf).canvasUnmap();
    that.pos = KAPhy.Physics.Vector2.add(that.pos, that.vel);
  };
}
if(!KAPhy.Physics.Circle.prototype.collideDynamicStatic) {
  KAPhy.Physics.Circle.prototype.collideDynamicStatic = function(that) {
    this.pos = KAPhy.Physics.Vector2.lerp(
      this.pos.canvasMap(),
      KAPhy.Physics.Vector2.add(that.pos.canvasMap(),
        KAPhy.Physics.Vector2.mult(
          KAPhy.Physics.Vector2.normalize(
            KAPhy.Physics.Vector2.sub(this.pos.canvasMap(), that.pos.canvasMap())
          ),
          this.rad + that.rad)
      ),
      KAPhy.Physics.circleAdjustment
    ).canvasUnmap();
    this.vel = KAPhy.Physics.Vector2.mult(
      KAPhy.Physics.Vector2.sub(
        KAPhy.Physics.Vector2.reflect(
          KAPhy.Physics.Vector2.sub(this.pos.canvasMap(), this.vel.canvasMap()),
          that.pos.canvasMap(), this.pos.canvasMap()),
        this.pos.canvasMap()),
      this.bcf * that.bcf).canvasUnmap();
    this.pos = KAPhy.Physics.Vector2.add(this.pos, this.vel);
  };
}
if(!KAPhy.Physics.Circle.prototype.collideDynamicDynamic) {
  KAPhy.Physics.Circle.prototype.collideDynamicDynamic = function(that) {
    var mid = KAPhy.Physics.Vector2.mid(this.pos, that.pos);
    var difference = KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.pos, that.pos));

    this.pos = KAPhy.Physics.Vector2.lerp(this.pos, KAPhy.Physics.Vector2.add(mid, KAPhy.Physics.Vector2.mult(difference, this.rad + that.rad)), KAPhy.Physics.circleAdjustment);
    that.pos = KAPhy.Physics.Vector2.lerp(that.pos, KAPhy.Physics.Vector2.sub(mid, KAPhy.Physics.Vector2.mult(difference, this.rad + that.rad)), KAPhy.Physics.circleAdjustment);

    var thisComponentOld = KAPhy.Physics.Vector2.dot(this.vel, difference);
    var thatComponentOld = KAPhy.Physics.Vector2.dot(that.vel, difference);

    var thisComponentNew = thatComponentOld * that.mass / this.mass;
    var thatComponentNew = thisComponentOld * this.mass / that.mass;

    this.vel.add(KAPhy.Physics.Vector2.mult(difference, (thisComponentNew - thisComponentOld) * this.bcf * that.bcf));
    that.vel.add(KAPhy.Physics.Vector2.mult(difference, (thatComponentNew - thatComponentOld) * this.bcf * that.bcf));
  };
}
if(!KAPhy.Physics.Circle.prototype.collideCircle) {
  KAPhy.Physics.Circle.prototype.collideCircle = function(that) {
    if (this.fixed && that.fixed) {
      return;
    }
    if (KAPhy.Physics.Vector2.distSq(this.pos.canvasMap(), that.pos.canvasMap()) > ((this.rad + that.rad) * (this.rad + that.rad))) {
      return;
    }
    if (this.fixed) {
      this.collideStaticDynamic(that);
      return;
    }
    if (that.fixed) {
      this.collideDynamicStatic(that);
      return;
    }
    this.collideDynamicDynamic(that);
  };
}
