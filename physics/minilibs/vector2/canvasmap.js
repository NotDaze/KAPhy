if(!KAPhy.Physics.Vector2.canvasMap) {
  KAPhy.Physics.Vector2.canvasMap = function(toMap) {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toCanvasUnits(toMap.x),
      KAPhy.Canvas.toCanvasUnits(toMap.y)
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.canvasMap) {
  KAPhy.Physics.Vector2.prototype.canvasMap = function() {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toCanvasUnits(this.x),
      KAPhy.Canvas.toCanvasUnits(this.y)
    );
  };
}
if(!KAPhy.Physics.Vector2.canvasUnmap) {
  KAPhy.Physics.Vector2.canvasUnmap = function(toMap) {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toPixels(toMap.x),
      KAPhy.Canvas.toPixels(toMap.y)
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.canvasUnmap) {
  KAPhy.Physics.Vector2.prototype.canvasUnmap = function() {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toPixels(this.x),
      KAPhy.Canvas.toPixels(this.y)
    );
  };
}