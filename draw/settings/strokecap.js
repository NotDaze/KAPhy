if(!KAPhy.Draw.strokeCap) {
  KAPhy.Draw.strokeCap = function(newCap) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newCap === ROUND || newCap === SQUARE || newCap === PROJECT) {
      KAPhy.Canvas.context.lineCap = newCap;
    }
  };
}
