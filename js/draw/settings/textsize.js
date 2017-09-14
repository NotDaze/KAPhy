if(!KAPhy.Draw.textSize) {
  KAPhy.Draw.textSize = function(size) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    KAPhy.Canvas.context.font = (currentFont.length === 3 ? (currentFont[0] + " ") : "") + KAPhy.Canvas.toPixels(Math.round(size)) + "px " + currentFont[currentFont.length - 1];
  };
}
