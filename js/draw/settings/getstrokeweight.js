if(!KAPhy.Draw.getStrokeWeight) {
  KAPhy.Draw.getStrokeWeight = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Canvas.toCanvasUnits(KAPhy.Canvas.context.lineWidth || 0);
  };
}
