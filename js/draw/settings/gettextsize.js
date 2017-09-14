if(!KAPhy.Draw.getTextSize) {
  KAPhy.Draw.getTextSize = function(size) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    return KAPhy.Canvas.toCanvasUnits(parseInt(currentFont[currentFont.length - 2]));
  };
}
