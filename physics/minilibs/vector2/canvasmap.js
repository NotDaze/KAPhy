if(!Vector2.canvasMap) {
  Vector2.canvasMap = function(toMap) {
    return new Vector2(
      Canvas.toCanvasUnits(toMap.x),
      Canvas.toCanvasUnits(toMap.y)
    );
  };
}
if(!Vector2.prototype.canvasMap) {
  Vector2.prototype.canvasMap = function() {
    return new Vector2(
      Canvas.toCanvasUnits(this.x),
      Canvas.toCanvasUnits(this.y)
    );
  };
}
if(!Vector2.canvasUnmap) {
  Vector2.canvasUnmap = function(toMap) {
    return new Vector2(
      Canvas.toPixels(toMap.x),
      Canvas.toPixels(toMap.y)
    );
  };
}
if(!Vector2.prototype.canvasUnmap) {
  Vector2.prototype.canvasUnmap = function() {
    return new Vector2(
      Canvas.toPixels(this.x),
      Canvas.toPixels(this.y)
    );
  };
}