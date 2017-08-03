if(!Physics.Circle.prototype.collideStaticDynamic) {
  Physics.Circle.prototype.collideStaticDynamic = function(that) {
    that.pos = Vector2.lerp(
      that.pos.canvasMap(),
      Vector2.add(this.pos.canvasMap(),
        Vector2.mult(
          Vector2.normalize(
            Vector2.sub(that.pos.canvasMap(), this.pos.canvasMap())
          ),
          this.rad + that.rad)
      ),
      Physics.circleAdjustment
    ).canvasUnmap();
    that.vel = Vector2.mult(
      Vector2.sub(
        Vector2.reflect(
          Vector2.sub(that.pos.canvasMap(), that.vel.canvasMap()),
          this.pos.canvasMap(), that.pos.canvasMap()),
        that.pos.canvasMap()),
      this.bcf * that.bcf).canvasUnmap();
    that.pos = Vector2.add(that.pos, that.vel);
  };
}
if(!Physics.Circle.prototype.collideDynamicStatic) {
  Physics.Circle.prototype.collideDynamicStatic = function(that) {
    this.pos = Vector2.lerp(
      this.pos.canvasMap(),
      Vector2.add(that.pos.canvasMap(),
        Vector2.mult(
          Vector2.normalize(
            Vector2.sub(this.pos.canvasMap(), that.pos.canvasMap())
          ),
          this.rad + that.rad)
      ),
      Physics.circleAdjustment
    ).canvasUnmap();
    this.vel = Vector2.mult(
      Vector2.sub(
        Vector2.reflect(
          Vector2.sub(this.pos.canvasMap(), this.vel.canvasMap()),
          that.pos.canvasMap(), this.pos.canvasMap()),
        this.pos.canvasMap()),
      this.bcf * that.bcf).canvasUnmap();
    this.pos = Vector2.add(this.pos, this.vel);
  };
if(!Physics.Circle.prototype.collideDynamicDynamic) {
  Physics.Circle.prototype.collideDynamicDynamic = function(that) {
    var mid = Vector2.mid(this.pos, that.pos);
    var difference = Vector2.normalize(Vector2.sub(this.pos, that.pos));

    this.pos = Vector2.lerp(this.pos, Vector2.add(mid, Vector2.mult(difference, this.rad + that.rad)), Physics.circleAdjustment);
    that.pos = Vector2.lerp(that.pos, Vector2.sub(mid, Vector2.mult(difference, this.rad + that.rad)), Physics.circleAdjustment);

    var thisComponentOld = Vector2.dot(this.vel, difference);
    var thatComponentOld = Vector2.dot(that.vel, difference);

    var thisComponentNew = thatComponentOld * that.mass / this.mass;
    var thatComponentNew = thisComponentOld * this.mass / that.mass;

    this.vel.add(Vector2.mult(difference, (thisComponentNew - thisComponentOld) * this.bcf * that.bcf));
    that.vel.add(Vector2.mult(difference, (thatComponentNew - thatComponentOld) * this.bcf * that.bcf));
  };
}
if(!Physics.Circle.prototype.collideCircle) {
  Physics.Circle.prototype.collideCircle = function(that) {
    if (this.fixed && that.fixed) {
      return;
    }
    if (Vector2.distSq(this.pos.canvasMap(), that.pos.canvasMap()) > ((this.rad + that.rad) * (this.rad + that.rad))) {
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