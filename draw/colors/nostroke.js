if(!Draw.noStroke) {
  Draw.noStroke = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - Draw.noStroke() takes 0 arguments.");
    }
    
    Canvas.context.strokeStyle = "rgba(0, 0, 0, 0.0)";
  };
}
