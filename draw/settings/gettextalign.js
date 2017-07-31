if(!Draw.getTextAlign) {
  Draw.getTextAlign = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length > 0) {
      console.warn("KAPhy Warning - Draw.getTextAlign() takes 0 arguments.");
    }
    
    return Canvas.context.textAlign;
  };
}
