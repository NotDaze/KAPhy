if(!Vector2.add) {
  Vector2.add = function(toAdd1, toAdd2) {
    return new Vector2(
      toAdd1.x + toAdd2.x,
      toAdd1.y + toAdd2.y
    );
  };
}
if(!Vector2.sub) {
  Vector2.sub = function(subtractFrom, toSubtract) {
    return new Vector2(
      subtractFrom.x - toSubtract.x,
      subtractFrom.y - toSubtract.y
    );
  };
}
if(!Vector2.mult) {
  Vector2.mult = function(toMultiply, scaleFactor) {
    return new Vector2(
      toMultiply.x * scaleFactor,
      toMultiply.y * scaleFactor
    );
  };
}
if(!Vector2.div) {
  Vector2.div = function(toDivide, inverseFactor) {
    return new Vector2(
      toDivide.x / inverseFactor,
      toDivide.y / inverseFactor
    );
  };
}
if(!Vector2.prototype.add) {
  Vector2.prototype.add = function(toAdd) {
    this.x += toAdd.x;
    this.y += toAdd.y;
  };
}
if(!Vector2.prototype.sub) {
  Vector2.prototype.sub = function(toSubtract) {
    this.x -= toSubtract.x;
    this.y -= toSubtract.y;
  };
}
if(!Vector2.prototype.mult) {
  Vector2.prototype.mult = function(scaleFactor) {
    this.x *= scaleFactor;
    this.y *= scaleFactor;
  };
}
if(!Vector2.prototype.div) {
  Vector2.prototype.div = function(inverseFactor) {
    this.x /= inverseFactor;
    this.y /= inverseFactor;
  };
}
