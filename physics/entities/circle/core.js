if(!Physics.Circle.prototype.update) {
  Physics.Circle.prototype.update = function() {
    if (this.fixed) {
      this.asleep = false;
      this.vel = new Vector2();
      return;
    }

    if (this.vel.magSq() > Physics.sleepThreshold * Physics.sleepThreshold || this.buoyancyForce > 0) {
      this.asleep = false;
    }
    this.pos.add(this.vel) //Add velocity to position

    this.vel.y += Canvas.getY(Physics.gravityForce - this.buoyancyForce); //Gravity

    this.vel.mult(this.waterDrag * (this.asleep ? Physics.asleepAirResistance : Physics.airResistance)); //Air resistance

    this.buoyancyForce = 0;
    this.waterDrag = 1;

    this.manageAdjustments();
  };
}
if(!Physics.Circle.prototype.draw) {
  Physics.Circle.prototype.draw = function() {
    Draw.ellipse(Canvas.xFromConverted(this.pos.x), Canvas.yFromConverted(this.pos.y), this.rad * 2, this.rad * 2);
  };
}
if(!Physics.Circle.prototype.display) {
  Physics.Circle.prototype.display = function() {
    if (this.move) {
      this.move();
    }
    this.update();
    this.draw();
  };
}
if(!Physics.Circle.prototype.manageAdjustments) {
  Physics.Circle.prototype.manageAdjustments = function() {
    if (this.posAdjustments.length === 0) {
      return;
    }

    var adjustmentAvg = new Vector2();
    for (var i = 0; i < this.posAdjustments.length; i++) {
      adjustmentAvg.add(this.posAdjustments[i]);
    }
    this.pos = Vector2.lerp(this.pos, Vector2.div(adjustmentAvg, this.posAdjustments.length), Physics.constraintAdjustment);

    this.posAdjustments = [];
  };
}
if(!Physics.Circle.prototype.trySleep) {
  Physics.Circle.prototype.trySleep = function() {
    if (Vector2.magSq(this.vel) < Physics.sleepThreshold * Physics.sleepThreshold) {
      this.asleep = true;
    }
  };
}