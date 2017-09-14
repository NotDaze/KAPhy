if(!KAPhy.Draw.strokeWeight) {
  KAPhy.Draw.strokeWeight = function(strokeWeight) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length > 1) {
      console.warn("KAPhy Warning - KAPhy.Draw.strokeWeight() takes 0 or 1 arguments.");
    }
    
    KAPhy.Canvas.context.lineWidth = KAPhy.Canvas.toPixels(strokeWeight || 0);
  };
}
