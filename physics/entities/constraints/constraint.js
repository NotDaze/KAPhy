if (!Physics.Constraint || KAPhy.version !== KAPhy.current) {
  Physics.Constraint = function(config) {
    this.one = config.one;
    this.two = config.two;

    this.rigidity = config.rigidity || config.rgd || 1 / 3;
    this.length = config.length || 100;

    this.one.constraints.push(this);
    this.two.constraints.push(this);
  };
  Physics.Constraint.prototype.springEffect = function() {
    var distance = Vector2.dist(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    var difference = Vector2.mult(Vector2.normalize(Vector2.sub(this.one.pos.canvasMap(), this.two.pos.canvasMap())), this.rigidity * (distance / this.length - 1));

    this.one.applyForce(Vector2.mult(difference, -1).canvasUnmap());
    this.two.applyForce(difference.canvasUnmap());
  };
  Physics.Constraint.prototype.forceCompensate = function() {
    var distance = Vector2.dist(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    var difference = Vector2.mult(Vector2.normalize(Vector2.sub(this.one.pos.canvasMap(), this.two.pos.canvasMap())), this.length / 2);
    var mid = Vector2.mid(this.one.pos.canvasMap(), this.two.pos.canvasMap());

    if (!this.one.fixed) {
      this.one.posAdjustments.push(Vector2.add(mid, difference).canvasUnmap());
    }

    if (!this.two.fixed) {
      this.two.posAdjustments.push(Vector2.sub(mid, difference).canvasUnmap());
    }
  };
  Physics.Constraint.prototype.draw = function() {
    Draw.strokeWeight(3);
    Draw.stroke(0, 0, 0);
    Draw.line(this.one.pos.x, this.one.pos.y, this.two.pos.x, this.two.pos.y);
  };
  Physics.Constraint.prototype.display = function() {
    if (this.update) {
      this.update();
    }
    this.draw();
  };
}
