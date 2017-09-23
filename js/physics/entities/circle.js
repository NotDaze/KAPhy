KAPhy.Physics.Circle = function(config) {
  /** Position and Velocity **/
  this.pos = config.pos || new KAPhy.Physics.Vector2(config.x || 0, config.y || 0);
  this.vel = config.vel || new KAPhy.Physics.Vector2(config.vx || 0, config.vy || 0);

  this.pos = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.pos.x), KAPhy.Canvas.toPixels(this.pos.y));
  this.vel = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.vel.x), KAPhy.Canvas.toPixels(this.vel.y));

  /** Bounciness **/
  this.bcf = config.bcf || 0.75;

  /** Radius **/
  this.rad = config.rad || 15;

  /** Array of Constraints **/
  this.constraints = [];

  /** Physical Sleep **/
  this.asleep = false;

  /** Array of Position Adjustments **/
  this.posAdjustments = [];

  /** Mass **/
  this.mass = config.mass || 1;

  /** Fixed or Not **/
  this.fixed = config.fixed || false;

  /** Variables Used When Submerged**/
  this.buoyancyForce = 0;
  this.waterDrag = 1;
};

/** Core **/
KAPhy.Physics.Circle.prototype.update = function() {
  if (this.fixed) {
    this.asleep = false;
    this.vel = new KAPhy.Physics.Vector2();
    return;
  }

  if (this.vel.magSq() > KAPhy.Physics.sleepThreshold * KAPhy.Physics.sleepThreshold || this.buoyancyForce > 0) {
    this.asleep = false;
  }
  this.pos.add(this.vel) //Add velocity to position

  this.vel.y += KAPhy.Canvas.toPixels(KAPhy.Physics.gravityForce - this.buoyancyForce); //Gravity

  this.vel.mult((this.asleep ? KAPhy.Physics.airResistanceSleeping : this.waterDrag * KAPhy.Physics.airResistance)); //Air resistance

  this.buoyancyForce = 0;
  this.waterDrag = 1;

  this.manageAdjustments();
};
KAPhy.Physics.Circle.prototype.draw = function() {
  KAPhy.Draw.ellipse(KAPhy.Canvas.toCanvasUnits(this.pos.x), KAPhy.Canvas.toCanvasUnits(this.pos.y), this.rad * 2, this.rad * 2);
};
KAPhy.Physics.Circle.prototype.display = function() {
  if (this.move) {
    this.move();
  }
  this.update();
  this.draw();
};
KAPhy.Physics.Circle.prototype.manageAdjustments = function() {
  if (this.posAdjustments.length === 0) {
    return;
  }

  var adjustmentAvg = new KAPhy.Physics.Vector2();
  for (var i = 0; i < this.posAdjustments.length; i++) {
    adjustmentAvg.add(this.posAdjustments[i]);
  }
  this.pos = KAPhy.Physics.Vector2.lerp(this.pos, KAPhy.Physics.Vector2.div(adjustmentAvg, this.posAdjustments.length), KAPhy.Physics.constraintAdjustment);

  this.posAdjustments = [];
};
KAPhy.Physics.Circle.prototype.trySleep = function() {
  if (KAPhy.Physics.Vector2.magSq(this.vel) < KAPhy.Physics.sleepThreshold * KAPhy.Physics.sleepThreshold) {
    this.asleep = true;
  }
};

/** Force **/
KAPhy.Physics.Circle.prototype.applyForce = function(velChange) {
  this.vel = KAPhy.Physics.Vector2.add(this.vel, KAPhy.Physics.Vector2.div(velChange, this.mass));
};
KAPhy.Physics.Circle.prototype.moveTowards = function(target, force) {
  this.applyForce(KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(target, this.pos)), force));
};
KAPhy.Physics.Circle.prototype.moveFrom = function(target, force) {
  this.applyForce(KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.pos, target)), force));
};

/** Line collision **/
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
    if (!KAPhy.Physics.Collision.intersecting(one, two, pos, prp)) {
      return;
    } else {
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
        ), -line.bcf * this.bcf).canvasUnmap();
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

/** Circle collision **/
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