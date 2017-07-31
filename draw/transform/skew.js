if(!Draw.skew) {
  Draw.skew = function(x, y) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - Draw.skew() takes 1 - 2 arguments.");
      return;
    }
    
    Canvas.context.transform(1, x, y || 0, 1, 0, 0);
  };
}
