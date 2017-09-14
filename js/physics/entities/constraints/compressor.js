if (!KAPhy.Physics.Compressor) {
  KAPhy.Physics.Compressor = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Compressor.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Compressor.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos, this.two.pos);
    if (distance < this.length) {
      this.springEffect();
    }
  };
}
