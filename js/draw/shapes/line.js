if(!KAPhy.Draw.line) {
  KAPhy.Draw.line = function(x1, y1, x2, y2) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.moveTo(x1, y1);
    KAPhy.Canvas.context.lineTo(x2, y2);
    KAPhy.Canvas.context.stroke();
  };
}
