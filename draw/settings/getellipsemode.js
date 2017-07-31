if(!Draw.getEllipseMode) {
  Draw.getEllipseMode = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    return Draw.currentEllipseMode;
  };
}
