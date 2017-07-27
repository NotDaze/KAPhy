Physics.Bungee = function(config) {
  Physics.Constraint.call(this, config);
};
Physics.Bungee.prototype = Object.create(Physics.Constraint.prototype);
Physics.Bungee.prototype.update = function() {
  var distance = Vector2.dist(this.one.pos, this.two.pos);
  if(distance > this.length) {
    this.springEffect();
  }
};
