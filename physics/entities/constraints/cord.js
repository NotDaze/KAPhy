if (!Physics.Cord) {
  Physics.Cord = function(config) {
    Physics.Constraint.call(this, config);
  };
  Physics.Cord.prototype = Object.create(Physics.Constraint.prototype);
  Physics.Cord.prototype.update = function() {
    var distance = Vector2.distSq(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    if (distance > (this.length * this.length)) {
      this.springEffect();
      this.forceCompensate();
    }
  };
}
