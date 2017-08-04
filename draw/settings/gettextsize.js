if(!Draw.getTextSize) {
  Draw.getTextSize = function(size) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = Canvas.context.font.split(" ");
    
    return Canvas.toCanvasUnits(parseInt(currentFont[currentFont.length - 1]));
  };
}
