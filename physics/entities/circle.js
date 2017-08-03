if (!Physics.Circle) {
  Physics.Circle = function(config) {
    /** Position and Velocity **/
    this.pos = config.pos || new Vector2(config.x || 0, config.y || 0);
    this.vel = config.vel || new Vector2(config.vx || 0, config.vy || 0);
    
    this.pos = new Vector2(Canvas.getX(this.pos.x), Canvas.getY(this.pos.y));
    this.vel = new Vector2(Canvas.getX(this.vel.x), Canvas.getY(this.vel.y));

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
  Physics.Circle.prototype.draw = function() {
    Draw.ellipse(Canvas.xFromConverted(this.pos.x), Canvas.yFromConverted(this.pos.y), this.rad * 2, this.rad * 2);
  };
  Physics.Circle.prototype.display = function() {
    if (this.move) {
      this.move();
    }
    this.update();
    this.draw();
  };
  Physics.Circle.prototype.moveTowards = function(target, force) {
    this.applyForce(Vector2.mult(Vector2.normalize(Vector2.sub(target, this.pos)), force));
  };
  Physics.Circle.prototype.moveFrom = function(target, force) {
    this.applyForce(Vector2.mult(Vector2.normalize(Vector2.sub(this.pos, target)), force));
  };
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
  Physics.Circle.prototype.trySleep = function() {
    if (Vector2.magSq(this.vel) < Physics.sleepThreshold * Physics.sleepThreshold) {
      this.asleep = true;
    }
  };
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
  Physics.Circle.prototype.applyForce = function(velChange) {
    this.vel = Vector2.add(this.vel, Vector2.div(velChange, this.mass));
  };
}
