if(!Draw.getTextFont) {
  Draw.getTextFont = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = Canvas.context.font.split(" ");
    
    return currentFont[currentFont.length - 1];
  };
}
