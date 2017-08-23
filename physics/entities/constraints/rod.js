if(!KAPhy.Physics.Rod) {
  KAPhy.Physics.Rod = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Rod.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Rod.prototype.update = function() {
    this.springEffect();
    this.forceCompensate();
  };
}
