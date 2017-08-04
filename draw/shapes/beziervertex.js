if(!Draw.bezierVertex) {
  Draw.bezierVertex = function(cx1, cy1, cx2, cy2, x, y) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use Draw.bezierVertex() in shape mode.");
      return;
    }
    
    Canvas.context.bezierCurveTo(Canvas.toPixels(cx1), Canvas.toPixels(cy1), Canvas.toPixels(cx2), Canvas.toPixels(cy2), Canvas.toPixels(x), Canvas.toPixels(y));
  };
}
