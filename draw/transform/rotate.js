if(!Draw.rotate) {
  Draw.rotate = function(t) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length !== 1) {
      console.warn("KAPhy Warning - Draw.rotate() takes 1 argument.");
      return;
    }
    
    Canvas.context.rotate(t);
  };
}
