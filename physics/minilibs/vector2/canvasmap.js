if(!Vector2.canvasMap) {
  Vector2.canvasMap = function(toMap) {
    return new Vector2(
      Canvas.xFromConverted(toMap.x),
      Canvas.yFromConverted(toMap.y)
    );
  };
}
if(!Vector2.prototype.canvasMap) {
  Vector2.prototype.canvasMap = function() {
    return new Vector2(
      Canvas.xFromConverted(this.x),
      Canvas.yFromConverted(this.y)
    );
  };
}
if(!Vector2.canvasUnmap) {
  Vector2.canvasUnmap = function(toMap) {
    return new Vector2(
      Canvas.getX(toMap.x),
      Canvas.getY(toMap.y)
    );
  };
}
if(!Vector2.prototype.canvasUnmap) {
  Vector2.prototype.canvasUnmap = function() {
    return new Vector2(
      Canvas.getX(this.x),
      Canvas.getY(this.y)
    );
  };
}