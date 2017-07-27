Physics.Spring = function(config) {
  Physics.Constraint.call(this, config);
};
Physics.Spring.prototype = Object.create(Physics.Constraint.prototype);
Physics.Spring.prototype.update = function() {
  this.springEffect();
};
