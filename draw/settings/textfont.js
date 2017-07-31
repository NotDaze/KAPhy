if(!Draw.textFont) {
  Draw.textFont = function(font, size, variant) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = Canvas.context.font.split(" ");
    
    Canvas.context.font = (variant ? (variant + " ") : "") + Math.round(size ? size : currentFont[0]) + "px " + font;
  };
}
