if(!KAPhy.Draw.bezierVertex) {
  KAPhy.Draw.bezierVertex = function(cx1, cy1, cx2, cy2, x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use KAPhy.Draw.bezierVertex() in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.bezierCurveTo(KAPhy.Canvas.toPixels(cx1), KAPhy.Canvas.toPixels(cy1), KAPhy.Canvas.toPixels(cx2), KAPhy.Canvas.toPixels(cy2), KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
  };
}
