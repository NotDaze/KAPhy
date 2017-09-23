if (!KAPhy.Physics.Cord) {
  KAPhy.Physics.Cord = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Cord.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Cord.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.distSq(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    if (distance > (this.length * this.length)) {
      this.springEffect();
      this.forceCompensate();
    }
  };
}
