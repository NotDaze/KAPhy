if(!KAPhy.Draw.textLineSpacing) {
  KAPhy.Draw.textLineSpacing = function(newSpacing) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 1) {
      console.warn("KAPhy Warning - KAPhy.Draw.textLineSpacing() takes 1 argument.");
    }
    
    KAPhy.Draw.currentTextLineSpacing = (newSpacing === 0 ? 0 : (newSpacing || 0.4));
  };
}