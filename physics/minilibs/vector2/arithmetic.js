if(!KAPhy.Physics.Vector2.add) {
  KAPhy.Physics.Vector2.add = function(toAdd1, toAdd2) {
    return new KAPhy.Physics.Vector2(
      toAdd1.x + toAdd2.x,
      toAdd1.y + toAdd2.y
    );
  };
}
if(!KAPhy.Physics.Vector2.sub) {
  KAPhy.Physics.Vector2.sub = function(subtractFrom, toSubtract) {
    return new KAPhy.Physics.Vector2(
      subtractFrom.x - toSubtract.x,
      subtractFrom.y - toSubtract.y
    );
  };
}
if(!KAPhy.Physics.Vector2.mult) {
  KAPhy.Physics.Vector2.mult = function(toMultiply, scaleFactor) {
    return new KAPhy.Physics.Vector2(
      toMultiply.x * scaleFactor,
      toMultiply.y * scaleFactor
    );
  };
}
if(!KAPhy.Physics.Vector2.div) {
  KAPhy.Physics.Vector2.div = function(toDivide, inverseFactor) {
    return new KAPhy.Physics.Vector2(
      toDivide.x / inverseFactor,
      toDivide.y / inverseFactor
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.add) {
  KAPhy.Physics.Vector2.prototype.add = function(toAdd) {
    this.x += toAdd.x;
    this.y += toAdd.y;
  };
}
if(!KAPhy.Physics.Vector2.prototype.sub) {
  KAPhy.Physics.Vector2.prototype.sub = function(toSubtract) {
    this.x -= toSubtract.x;
    this.y -= toSubtract.y;
  };
}
if(!KAPhy.Physics.Vector2.prototype.mult) {
  KAPhy.Physics.Vector2.prototype.mult = function(scaleFactor) {
    this.x *= scaleFactor;
    this.y *= scaleFactor;
  };
}
if(!KAPhy.Physics.Vector2.prototype.div) {
  KAPhy.Physics.Vector2.prototype.div = function(inverseFactor) {
    this.x /= inverseFactor;
    this.y /= inverseFactor;
  };
}
