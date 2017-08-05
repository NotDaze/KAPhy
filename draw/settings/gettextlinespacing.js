if(!Draw.getTextLineSpacing) {
  Draw.getTextLineSpacing = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - Draw.getTextLineSpacing() takes 0 argument.");
    }
    
    return Draw.currentTextLineSpacing;
  };
}