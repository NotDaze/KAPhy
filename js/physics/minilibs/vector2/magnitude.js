if(!KAPhy.Physics.Vector2.mag) {
   KAPhy.Physics.Vector2.mag = function(toMeasure) {
    return Math.sqrt(toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y);
  };
}
if(!KAPhy.Physics.Vector2.magSq) {
  KAPhy.Physics.Vector2.magSq = function(toMeasure) {
    return toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y;
  };
}
if(!KAPhy.Physics.Vector2.normalize) {
  KAPhy.Physics.Vector2.normalize = function(toNormalize) {
    return KAPhy.Physics.Vector2.div(toNormalize, toNormalize.mag());
  };
}
if(!KAPhy.Physics.Vector2.dist) {
  KAPhy.Physics.Vector2.dist = function(lineEnd1, lineEnd2) {
    return KAPhy.Physics.Vector2.sub(lineEnd1, lineEnd2).mag();
  };
}
if(!KAPhy.Physics.Vector2.distSq) {
  KAPhy.Physics.Vector2.distSq = function(lineEnd1, lineEnd2) {
    return KAPhy.Physics.Vector2.magSq(KAPhy.Physics.Vector2.sub(lineEnd1, lineEnd2));
  };
}
if(!KAPhy.Physics.Vector2.mid) {
   KAPhy.Physics.Vector2.mid = function(lineEnd1, lineEnd2) {
    return new KAPhy.Physics.Vector2(
      lineEnd1.x / 2 + lineEnd2.x / 2,
      lineEnd1.y / 2 + lineEnd2.y / 2
    );
  };
}
if(!KAPhy.Physics.Vector2.lerp) {
   KAPhy.Physics.Vector2.lerp = function(lerpFrom, lerpTo, lerpStage) {
    return new KAPhy.Physics.Vector2(
      lerpFrom.x + (lerpTo.x - lerpFrom.x) * lerpStage,
      lerpFrom.y + (lerpTo.y - lerpFrom.y) * lerpStage
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.mag) { 
  KAPhy.Physics.Vector2.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
}
if(!KAPhy.Physics.Vector2.prototype.magSq) {
  KAPhy.Physics.Vector2.prototype.magSq = function() {
    return this.x * this.x + this.y * this.y;
  };
}
if(!KAPhy.Physics.Vector2.prototype.normalize) {
  KAPhy.Physics.Vector2.prototype.normalize = function() {
    this.div(this.mag());
  };
}
if(!KAPhy.Physics.Vector2.prototype.dist) {
  KAPhy.Physics.Vector2.prototype.dist = function(lineEnd) {
    return KAPhy.Physics.Vector2.sub(this, lineEnd).mag();
  };
}
if(!KAPhy.Physics.Vector2.prototype.distSq) {
  KAPhy.Physics.Vector2.prototype.distSq = function(lineEnd) {
    return KAPhy.Physics.Vector2.sub(this, lineEnd).magSq();
  };
}
if(!KAPhy.Physics.Vector2.prototype.mid) {
   KAPhy.Physics.Vector2.prototype.mid = function(lineEnd) {
    return new KAPhy.Physics.Vector2(
      this.x / 2 + lineEnd.x / 2,
      this.y / 2 + lineEnd.y / 2
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.lerp) {
   KAPhy.Physics.Vector2.prototype.lerp = function(lerpWith, lerpStage) {
    return new KAPhy.Physics.Vector2(
      this.x + (lerpWith.x - this.x) * lerpStage,
      this.y + (lerpWith.y - this.y) * lerpStage
    );
  };
}
