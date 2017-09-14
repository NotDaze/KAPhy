if(!KAPhy.Physics.Spring) {
  KAPhy.Physics.Spring = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Spring.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Spring.prototype.update = function() {
    this.springEffect();
  };
}
