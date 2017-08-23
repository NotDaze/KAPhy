if(!KAPhy.Physics.Vector2.array) {
  KAPhy.Physics.Vector2.array = function(toConvert) {
    return [toConvert.x, toConvert.y];
  };
}
if(!KAPhy.Physics.Vector2.prototype.array) {
  KAPhy.Physics.Vector2.prototype.array = function() {
    return [this.x, this.y];
  };
}
if(!KAPhy.Physics.Vector2.prototype.get) {
  KAPhy.Physics.Vector2.prototype.get = function() {
    return new KAPhy.Physics.Vector2(this.x, this.y);
  };
}
if(!KAPhy.Physics.Vector2.prototype.set) {
  KAPhy.Physics.Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  };
}
