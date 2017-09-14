if(!KAPhy.Draw.getTextLineSpacing) {
  KAPhy.Draw.getTextLineSpacing = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.getTextLineSpacing() takes 0 argument.");
    }
    
    return KAPhy.Draw.currentTextLineSpacing;
  };
}