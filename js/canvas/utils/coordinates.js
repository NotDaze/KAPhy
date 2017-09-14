if(!KAPhy.Canvas.toPixels) {
  KAPhy.Canvas.toPixels = function(n) {
    return n * KAPhy.Canvas.element.width/KAPhy.Canvas.relWidth;
  };
}
if(!KAPhy.Canvas.toCanvasUnits) {
  KAPhy.Canvas.toCanvasUnits = function(n) {
    return n * KAPhy.Canvas.relHeight/KAPhy.Canvas.element.height;
  }
}
