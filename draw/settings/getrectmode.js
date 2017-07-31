if(!Draw.getRectMode) {
  Draw.getRectMode = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    return Draw.currentRectMode;
  };
}
