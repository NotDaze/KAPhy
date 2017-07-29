if(!Draw.imageMode) {
  Draw.imageMode = function(newMode) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newMode === CENTER || newMode === CORNER || newMode === CORNERS || newMode === RADIUS) {
      Draw.currentImageMode = newMode;
    }
  };
}
