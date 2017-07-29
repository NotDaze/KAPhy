if(!Draw.rectMode || KAPhy.version !== KAPhy.current) {
  Draw.rectMode = function(newMode) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newMode === CENTER || newMode === CORNER || newMode === CORNERS || newMode === RADIUS) {
      Draw.currentRectMode = newMode;
    }
  };
}
