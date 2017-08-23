if(!KAPhy.Draw.textFont) {
  KAPhy.Draw.textFont = function(font, size, variant) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    KAPhy.Canvas.context.font = (variant ? (variant + " ") : "") + Math.round(size ? KAPhy.Canvas.toPixels(size) : parseInt(currentFont[currentFont.length - 2])) + "px " + font;
  };
}
