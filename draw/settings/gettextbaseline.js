if(!Draw.getTextBaseline) {
  Draw.getTextBaseline = function(newAlign, yAlign) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - Draw.textAlign() takes 0 arguments.");
    }
    
    return Canvas.context.textBaseline;
  };
}
