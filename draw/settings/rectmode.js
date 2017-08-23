if(!KAPhy.Draw.rectMode) {
  KAPhy.Draw.rectMode = function(newMode) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newMode === CENTER || newMode === CORNER || newMode === CORNERS || newMode === RADIUS) {
      KAPhy.Draw.currentRectMode = newMode;
    }
  };
}
