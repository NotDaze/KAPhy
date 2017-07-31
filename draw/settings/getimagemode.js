if(!Draw.getImageMode) {
  Draw.getImageMode = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    return Draw.currentImageMode;
  };
}
