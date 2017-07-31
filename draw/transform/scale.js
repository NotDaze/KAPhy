if(!Draw.scale) {
  Draw.scale = function(x, y) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - Draw.scale() takes 1 - 2 arguments.");
      return;
    }
    
    Canvas.context.scale(x, y || x);
  };
}
