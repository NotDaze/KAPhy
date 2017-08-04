if(!Canvas.toPixels) {
  Canvas.toPixels = function(n) {
    return n * Canvas.element.width/Canvas.relWidth;
  };
}
if(!Canvas.toCanvasUnits) {
  Canvas.toCanvasUnits = function(n) {
    return n * Canvas.relHeight/Canvas.element.height;
  }
}
