if (!Vector2) {
  var Vector2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };
  
  
  
  Vector2.mid = function(lineEnd1, lineEnd2) {
    return new Vector2(
      lineEnd1.x / 2 + lineEnd2.x / 2,
      lineEnd1.y / 2 + lineEnd2.y / 2
    );
  };
  Vector2.lerp = function(lerpFrom, lerpTo, lerpStage) {
    return new Vector2(
      lerpFrom.x + (lerpTo.x - lerpFrom.x) * lerpStage,
      lerpFrom.y + (lerpTo.y - lerpFrom.y) * lerpStage
    );
  };
  Vector2.dot = function(toDot1, toDot2) {
    return toDot1.x * toDot2.x + toDot1.y * toDot2.y;
  };
  Vector2.array = function(toConvert) {
    return [toConvert.x, toConvert.y];
  };
  
  
  
  
  Vector2.prototype.mid = function(lineEnd) {
    return new Vector2(
      this.x / 2 + lineEnd.x / 2,
      this.y / 2 + lineEnd.y / 2
    );
  };
  Vector2.prototype.lerp = function(lerpWith, lerpStage) {
    return new Vector2(
      this.x + (lerpWith.x - this.x) * lerpStage,
      this.y + (lerpWith.y - this.y) * lerpStage
    );
  };
  Vector2.prototype.dot = function(dotWith) {
    return this.x * dotWith.x + this.y * dotWith.y;
  };
  Vector2.prototype.array = function() {
    return [this.x, this.y];
  };
  
  Vector2.prototype.get = function() {
    return new Vector2(this.x, this.y);
  };
  Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  };
}
