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
    
    Canvas.context.bezierCurveTo(Canvas.getX(cx1), Canvas.getY(cy1), Canvas.getX(cx2), Canvas.getY(cy2), Canvas.getX(x), Canvas.getY(y));
  };
}
