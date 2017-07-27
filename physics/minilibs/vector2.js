if (!Vector2) {
  /*
    Vector2 is a more advanced, more specialized PVector.
  */
  var Vector2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };
  /*
    Returns the sum of two vectors
  */
  Vector2.add = function(toAdd1, toAdd2) {
    return new Vector2(
      toAdd1.x + toAdd2.x,
      toAdd1.y + toAdd2.y
    );
  };
  /*
    Returns the difference of two vectors
  */
  Vector2.sub = function(subtractFrom, toSubtract) {
    return new Vector2(
      subtractFrom.x - toSubtract.x,
      subtractFrom.y - toSubtract.y
    );
  };
  /*
    Returns the product of a vector and a scalar
  */
  Vector2.mult = function(toMultiply, scaleFactor) {
    return new Vector2(
      toMultiply.x * scaleFactor,
      toMultiply.y * scaleFactor
    );
  };
  /*
    Returns the quotient of a vector and a scalar
  */
  Vector2.div = function(toDivide, inverseFactor) {
    return new Vector2(
      toDivide.x / inverseFactor,
      toDivide.y / inverseFactor
    );
  };
  /*
    Returns the magnitude or length of a vector
  */
  Vector2.mag = function(toMeasure) {
    return Math.sqrt(toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y);
  };
  /*
    Returns the square of the magnitude of a vector
    This is much faster than .mag and works in some situations
  */
  Vector2.magSq = function(toMeasure) {
    return toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y;
  };
  /*
    Returns the unit equivalent of a vector
  */
  Vector2.normalize = function(toNormalize) {
    return Vector2.div(toNormalize, toNormalize.mag());
  };
  /*
    Returns the rotation of a vector
  */
  Vector2.rotate = function(toRotate, rotateBy) {
    var cosAngle = Math.cos(rotateBy);
    var sinAngle = Math.sin(rotateBy);
    return new Vector2(
      toRotate.x * cosAngle - y * sinAngle,
      toRotate.x * sinAngle + y * cosAngle
    );
  };
  /*
    Returns the midpoint of two vectors
  */
  Vector2.mid = function(lineEnd1, lineEnd2) {
    return new Vector2(
      lineEnd1.x / 2 + lineEnd2.x / 2,
      lineEnd1.y / 2 + lineEnd2.y / 2
    );
  };
  /*
    Returns the distance between two vectors
  */
  Vector2.dist = function(lineEnd1, lineEnd2) {
    return Vector2.sub(lineEnd1, lineEnd2).mag();
  };
  /*
    Returns the linear interpolation of two vectors
  */
  Vector2.lerp = function(lerpFrom, lerpTo, lerpStage) {
    return new Vector2(
      lerpFrom.x + (lerpTo.x - lerpFrom.x) * lerpStage,
      lerpFrom.y + (lerpTo.y - lerpFrom.y) * lerpStage
    );
  };
  /*
    Returns the dot product of two vectors
  */
  Vector2.dot = function(toDot1, toDot2) {
    return toDot1.x * toDot2.x + toDot1.y * toDot2.y;
  };
  /*
    Returns a vector converted to an array
  */
  Vector2.array = function(toConvert) {
    return [toConvert.x, toConvert.y];
  };
  /*
    Returns the reflection of one vector over the line represented by two other vectors
  */
  Vector2.reflect = function(toReflect, linePoint1, linePoint2) {
    return Vector2.sub(toReflect,
      Vector2.mult(
        Vector2.sub(toReflect, new Vector2(
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), toReflect)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)), Equation.M(linePoint1, linePoint2) *
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), toReflect)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)) + Equation.B(linePoint1, linePoint2)
        )),
        2)
    );
  };

  /*
    Adds a vector to this vector
  */
  Vector2.prototype.add = function(toAdd) {
    this.x += toAdd.x;
    this.y += toAdd.y;
  };
  /*
    Subtracts a vector from this vector
  */
  Vector2.prototype.sub = function(toSubtract) {
    this.x -= toSubtract.x;
    this.y -= toSubtract.y;
  };
  /*
    Scales this vector
  */
  Vector2.prototype.mult = function(scaleFactor) {
    this.x *= scaleFactor;
    this.y *= scaleFactor;
  };
  /*
    Inversely scales this vector
  */
  Vector2.prototype.div = function(inverseFactor) {
    this.x /= inverseFactor;
    this.y /= inverseFactor;
  };
  /*
    Returns the magnitude of this vector
  */
  Vector2.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  /*
    Returns the squared magnitude of this vector
  */
  Vector2.prototype.magSq = function() {
    return this.x * this.x + this.y + this.y;
  };
  /*
    Normalizes the vector
  */
  Vector2.prototype.normalize = function() {
    this.div(this.mag());
  };
  /*
    Rotates the vector
  */
  Vector2.prototype.rotate = function(rotateBy) {
    var cosAngle = Math.cos(rotateBy);
    var sinAngle = Math.sin(rotateBy);
    var oldX = this.x;
    this.x = oldX * cosAngle - y * sinAngle;
    this.y = oldX * sinAngle + y * cosAngle;
  };
  /*
    Returns the midpoint of this and another vector
  */
  Vector2.prototype.mid = function(lineEnd) {
    return new Vector2(
      this.x / 2 + lineEnd.x / 2,
      this.y / 2 + lineEnd.y / 2
    );
  };
  /*
    Returns the distance between this and another vector
  */
  Vector2.prototype.dist = function(lineEnd) {
    return Vector2.sub(this, lineEnd).mag();
  };
  /*
    Returns the linear interpolation of this and another vector
  */
  Vector2.prototype.lerp = function(lerpWith, lerpStage) {
    return new Vector2(
      this.x + (lerpWith.x - this.x) * lerpStage,
      this.y + (lerpWith.y - this.y) * lerpStage
    );
  };
  /*
    Returns the dot product of this and another vector
  */
  Vector2.prototype.dot = function(dotWith) {
    return this.x * dotWith.x + this.y * dotWith.y;
  };
  /*
    Returns this vector converted to an array
  */
  Vector2.prototype.array = function() {
    return [this.x, this.y];
  };
  /*
    Returns the reflection of this vector over a line defined by two points
  */
  Vector2.prototype.reflect = function(linePoint1, linePoint2) {
    return Vector2.sub(this,
      Vector2.mult(
        Vector2.sub(this, new Vector2(
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), this)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)), Equation.M(linePoint1, linePoint2) *
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), this)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)) + Equation.B(linePoint1, linePoint2)
        )),
        2)
    );
  };
  /*
    Returns a copy of this vector
  */
  Vector2.prototype.get = function() {
    return new Vector2(this.x, this.y);
  };
  /*
    Sets the coordinates of this vector
  */
  Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  };
}
