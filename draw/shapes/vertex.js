if(!KAPhy.Draw.vertex) {
  KAPhy.Draw.vertex = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use KAPhy.Draw.vertex() in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.lineTo(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
  };
}
