Physics.Cord = function(config) {
  Physics.Constraint.call(this, config);
};
Physics.Cord.prototype = Object.create(Physics.Constraint.prototype);
Physics.Cord.prototype.update = function() {
  var distance = Vector2.dist(this.one.pos, this.two.pos);
  if(distance > this.length) {
    this.springEffect();
    this.forceCompensate();
  }
};
