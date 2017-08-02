if(!Vector2.prototype.mag) { 
  Vector2.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
}
if(!Vector2.prototype.magSq) {
  Vector2.prototype.magSq = function() {
    return this.x * this.x + this.y * this.y;
  };
}
if(!Vector2.prototype.normalize) {
  Vector2.prototype.normalize = function() {
    this.div(this.mag());
  };
}
if(!Vector2.prototype.dist) {
  Vector2.prototype.dist = function(lineEnd) {
    return Vector2.sub(this, lineEnd).mag();
  };
}
if(!Vector2.prototype.distSq) {
  Vector2.prototype.distSq = function(lineEnd) {
    return Vector2.sub(this, lineEnd).magSq();
  };
}
