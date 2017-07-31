if(!Draw.textAlign) {
  Draw.textAlign = function(newAlign, yAlign) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length > 2) {
      console.warn("KAPhy Warning - Draw.textAlign() takes 0 - 2 arguments.");
    }
    
    Canvas.context.textAlign = newAlign || "left";
    if(yAlign) Canvas.context.textBaseline = yAlign;
  };
}
