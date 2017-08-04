if(!Canvas.scale) {
  Canvas.toPixels = function(n) {
    return n * Canvas.element.width/Canvas.relWidth;
  };
}
if(!Canvas.unscale) {
  Canvas.toCanvasUnits = function(n) {
    return n * Canvas.relHeight/Canvas.element.height;
  }
}
