if(!Draw.pushMatrix) {
  Draw.pushMatrix = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You cannot use transformation commands in shape mode.");
      return;
    }
    
    Canvas.context.save();
  };
}
