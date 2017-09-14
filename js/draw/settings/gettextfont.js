if(!KAPhy.Draw.getTextFont) {
  KAPhy.Draw.getTextFont = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    return KAPhy.Canvas.toCanvasUnits(currentFont[currentFont.length - 1]);
  };
}
