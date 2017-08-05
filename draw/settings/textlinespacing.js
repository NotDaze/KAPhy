if(!Draw.textLineSpacing) {
  Draw.textLineSpacing = function(newSpacing) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 1) {
      console.warn("KAPhy Warning - Draw.textLineSpacing() takes 1 argument.");
    }
    
    Draw.currentTextLineSpacing = (newSpacing === 0 ? 0 : (newSpacing || 0.4));
  };
}