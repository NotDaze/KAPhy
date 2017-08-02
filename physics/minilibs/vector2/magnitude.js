if(!Vector2.mag) {
   Vector2.mag = function(toMeasure) {
    return Math.sqrt(toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y);
  };
}
if(!Vector2.magSq) {
  Vector2.magSq = function(toMeasure) {
    return toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y;
  };
}
if(!Vector2.normalize) {
  Vector2.normalize = function(toNormalize) {
    return Vector2.div(toNormalize, toNormalize.mag());
  };
}
if(!Vector2.dist) {
  Vector2.dist = function(lineEnd1, lineEnd2) {
    return Vector2.sub(lineEnd1, lineEnd2).mag();
  };
}
if(!Vector2.distSq) {
  Vector2.distSq = function(lineEnd1, lineEnd2) {
    return Vector2.sub(lineEnd1, lineEnd2).magSq();
  };
}
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
