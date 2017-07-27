if (!Physics.Compressor) {
  Physics.Compressor = function(config) {
    Physics.Constraint.call(this, config);
  };
  Physics.Compressor.prototype = Object.create(Physics.Constraint.prototype);
  Physics.Compressor.prototype.update = function() {
    var distance = Vector2.dist(this.one.pos, this.two.pos);
    if (distance < this.length) {
      this.springEffect();
    }
  };
}
