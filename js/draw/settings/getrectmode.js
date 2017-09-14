if(!KAPhy.Draw.getRectMode) {
  KAPhy.Draw.getRectMode = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Draw.currentRectMode;
  };
}
