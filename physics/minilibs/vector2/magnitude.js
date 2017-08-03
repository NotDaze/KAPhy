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
    return Vector2.magSq(Vector2.sub(lineEnd1, lineEnd2));
  };
}
if(!Vector2.mid) {
   Vector2.mid = function(lineEnd1, lineEnd2) {
    return new Vector2(
      lineEnd1.x / 2 + lineEnd2.x / 2,
      lineEnd1.y / 2 + lineEnd2.y / 2
    );
  };
}
if(!Vector2.lerp) {
   Vector2.lerp = function(lerpFrom, lerpTo, lerpStage) {
    return new Vector2(
      lerpFrom.x + (lerpTo.x - lerpFrom.x) * lerpStage,
      lerpFrom.y + (lerpTo.y - lerpFrom.y) * lerpStage
    );
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
if(!Vector2.prototype.mid) {
   Vector2.prototype.mid = function(lineEnd) {
    return new Vector2(
      this.x / 2 + lineEnd.x / 2,
      this.y / 2 + lineEnd.y / 2
    );
  };
}
if(!Vector2.prototype.lerp) {
   Vector2.prototype.lerp = function(lerpWith, lerpStage) {
    return new Vector2(
      this.x + (lerpWith.x - this.x) * lerpStage,
      this.y + (lerpWith.y - this.y) * lerpStage
    );
  };
}
