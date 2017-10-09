if (!KAPhy.Physics.Constraint) {
  KAPhy.Physics.Constraint = function(config) {
    this.one = config.one;
    this.two = config.two;

    this.rigidity = config.rigidity || config.rgd || 1 / 3;
    this.length = config.length || 100;

    this.one.constraints.push(this);
    this.two.constraints.push(this);
  };
  KAPhy.Physics.Constraint.prototype.springEffect = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    var difference = KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.one.pos.canvasMap(), this.two.pos.canvasMap())), this.rigidity * (distance / this.length - 1));

    this.one.applyForce(KAPhy.Physics.Vector2.mult(difference, -1).canvasUnmap());
    this.two.applyForce(difference.canvasUnmap());
  };
  KAPhy.Physics.Constraint.prototype.forceCompensate = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    var difference = KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.one.pos.canvasMap(), this.two.pos.canvasMap())), this.length / 2);
    var mid = KAPhy.Physics.Vector2.mid(this.one.pos.canvasMap(), this.two.pos.canvasMap());

    if (!this.one.fixed) {
      this.one.posAdjustments.push(KAPhy.Physics.Vector2.add(mid, difference).canvasUnmap());
    }

    if (!this.two.fixed) {
      this.two.posAdjustments.push(KAPhy.Physics.Vector2.sub(mid, difference).canvasUnmap());
    }
  };
  KAPhy.Physics.Constraint.prototype.draw = function() {
    KAPhy.Draw.line(this.one.pos.x, this.one.pos.y, this.two.pos.x, this.two.pos.y);
  };
  KAPhy.Physics.Constraint.prototype.display = function() {
    if (this.update) {
      this.update();
    }
    this.draw();
  };
}
