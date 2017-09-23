if (!KAPhy.Physics.Extender) {
  KAPhy.Physics.Extender = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Extender.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Extender.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos, this.two.pos);
    if (distance < this.length) {
      this.springEffect();
      this.forceCompensate();
    }
  };
}
