if(!Physics.Rod) {
  Physics.Rod = function(config) {
    Physics.Constraint.call(this, config);
  };
  Physics.Rod.prototype = Object.create(Physics.Constraint.prototype);
  Physics.Rod.prototype.update = function() {
    this.springEffect();
    this.forceCompensate();
  };
}
