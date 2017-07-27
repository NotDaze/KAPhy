if (!Physics.Extender) {
  Physics.Extender = function(config) {
    Physics.Constraint.call(this, config);
  };
  Physics.Extender.prototype = Object.create(Physics.Constraint.prototype);
  Physics.Extender.prototype.update = function() {
    var distance = Vector2.dist(this.one.pos, this.two.pos);
    if (distance < this.length) {
      this.springEffect();
      this.forceCompensate();
    }
  };
}
