if(!Draw.textSize) {
  Draw.textSize = function(size) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = Canvas.context.font.split(" ");
    
    Canvas.context.font = (currentFont.length === 3 ? (currentFont[0] + " ") : "") + Canvas.toPixels(Math.round(size)) + "px " + currentFont[currentFont.length - 1];
  };
}
