if(!Draw.ellipseMode) {
  Draw.ellipseMode = function(newMode) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newMode === CENTER || newMode === CORNER || newMode === CORNERS || newMode === RADIUS) {
      Draw.currentEllipseMode = newMode;
    }
  };
}
