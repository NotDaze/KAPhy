if(!KAPhy.Draw.quadVertex) {
  KAPhy.Draw.quadVertex = function(cx, cy, x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use KAPhy.Draw.quadVertex() in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.quadraticCurveTo(KAPhy.Canvas.toPixels(cx), KAPhy.Canvas.toPixels(cy), KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
  };
}
