if(!KAPhy.Draw.point) {
  KAPhy.Draw.point = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.moveTo(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
    KAPhy.Canvas.context.lineTo(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
    KAPhy.Canvas.context.stroke();
  };
}
