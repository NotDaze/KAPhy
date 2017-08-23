if(!KAPhy.Physics.Circle.prototype.update) {
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
}
if(!KAPhy.Physics.Circle.prototype.draw) {
  KAPhy.Physics.Circle.prototype.draw = function() {
    KAPhy.Draw.ellipse(KAPhy.Canvas.toCanvasUnits(this.pos.x), KAPhy.Canvas.toCanvasUnits(this.pos.y), this.rad * 2, this.rad * 2);
  };
}
if(!KAPhy.Physics.Circle.prototype.display) {
  KAPhy.Physics.Circle.prototype.display = function() {
    if (this.move) {
      this.move();
    }
    this.update();
    this.draw();
  };
}
if(!KAPhy.Physics.Circle.prototype.manageAdjustments) {
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
}
if(!KAPhy.Physics.Circle.prototype.trySleep) {
  KAPhy.Physics.Circle.prototype.trySleep = function() {
    if (KAPhy.Physics.Vector2.magSq(this.vel) < KAPhy.Physics.sleepThreshold * KAPhy.Physics.sleepThreshold) {
      this.asleep = true;
    }
  };
}