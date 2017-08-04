if(!Draw.quadVertex || KAPhy.version !== KAPhy.current) {
  Draw.quadVertex = function(cx, cy, x, y) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use Draw.quadVertex() in shape mode.");
      return;
    }
    
    Canvas.context.quadraticCurveTo(Canvas.toPixels(cx), Canvas.toPixels(cy), Canvas.toPixels(x), Canvas.toPixels(y));
  };
}
