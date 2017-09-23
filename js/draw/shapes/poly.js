if(!KAPhy.Draw.poly) {
  KAPhy.Draw.poly = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.moveTo(KAPhy.Canvas.toPixels(arguments[0]), KAPhy.Canvas.toPixels(arguments[1]));
    for(var i = 2; i < arguments.length; i += 2) {
      KAPhy.Canvas.context.lineTo(KAPhy.Canvas.toPixels(arguments[i]), KAPhy.Canvas.toPixels(arguments[i + 1]));
    }
    KAPhy.Canvas.context.closePath();
    
    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
  };
}
