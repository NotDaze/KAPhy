if(!Draw.strokeWeight) {
  Draw.strokeWeight = function(strokeWeight) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length > 1) {
      console.warn("KAPhy Warning - Draw.strokeWeight() takes 0 or 1 arguments.");
    }
    
    Canvas.context.lineWidth = strokeWeight || 0;
  };
}
