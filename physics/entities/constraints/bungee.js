if (!KAPhy.Physics.Bungee) {
  KAPhy.Physics.Bungee = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Bungee.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Bungee.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos, this.two.pos);
    if (distance > this.length) {
      this.springEffect();
    }
  };
}
