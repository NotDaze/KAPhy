if(!KAPhy.Physics.Circle.prototype.applyForce) {
  KAPhy.Physics.Circle.prototype.applyForce = function(velChange) {
    this.vel = KAPhy.Physics.Vector2.add(this.vel, KAPhy.Physics.Vector2.div(velChange, this.mass));
  };
}
if(!KAPhy.Physics.Circle.prototype.moveTowards) {
  KAPhy.Physics.Circle.prototype.moveTowards = function(target, force) {
    this.applyForce(KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(target, this.pos)), force));
  };
}
if(!KAPhy.Physics.Circle.prototype.moveFrom) {
  KAPhy.Physics.Circle.prototype.moveFrom = function(target, force) {
    this.applyForce(KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.pos, target)), force));
  };
}