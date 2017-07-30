if(!Draw.textFont || KAPhy.version !== KAPhy.current) {
  Draw.textFont = function(font, size) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = Canvas.context.font.split(" ");
    
    if(!size) {
      Canvas.context.font = parseInt(currentFont[0]) + "px " + font;
      return;
    }
  
    Canvas.context.font = Math.round(size) + "px " + font;
  };
}
