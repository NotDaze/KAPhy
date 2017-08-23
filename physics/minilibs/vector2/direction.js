if(!KAPhy.Physics.Vector2.rotate) {
  KAPhy.Physics.Vector2.rotate = function(toRotate, rotateBy) {
    var cosAngle = Math.cos(rotateBy);
    var sinAngle = Math.sin(rotateBy);
    return new KAPhy.Physics.Vector2(
      toRotate.x * cosAngle - toRotate.y * sinAngle,
      toRotate.x * sinAngle + toRotate.y * cosAngle
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.rotate) {
  KAPhy.Physics.Vector2.prototype.rotate = function(rotateBy) {
    var cosAngle = Math.cos(rotateBy);
    var sinAngle = Math.sin(rotateBy);
    var oldX = this.x;
    this.x = oldX * cosAngle - this.y * sinAngle;
    this.y = oldX * sinAngle + this.y * cosAngle;
  };
}
