if(!Physics.Circle.prototype.applyForce) {
  Physics.Circle.prototype.applyForce = function(velChange) {
    this.vel = Vector2.add(this.vel, Vector2.div(velChange, this.mass));
  };
}
if(!Physics.Circle.prototype.moveTowards) {
  Physics.Circle.prototype.moveTowards = function(target, force) {
    this.applyForce(Vector2.mult(Vector2.normalize(Vector2.sub(target, this.pos)), force));
  };
}
if(!Physics.Circle.prototype.moveFrom) {
  Physics.Circle.prototype.moveFrom = function(target, force) {
    this.applyForce(Vector2.mult(Vector2.normalize(Vector2.sub(this.pos, target)), force));
  };
}