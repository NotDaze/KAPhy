if(!Vector2.array) {
  Vector2.array = function(toConvert) {
    return [toConvert.x, toConvert.y];
  };
}
if(!Vector2.prototype.array) {
  Vector2.prototype.array = function() {
    return [this.x, this.y];
  };
}
if(!Vector2.prototype.get) {
  Vector2.prototype.get = function() {
    return new Vector2(this.x, this.y);
  };
}
if(!Vector2.prototype.set) {
  Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  };
}
