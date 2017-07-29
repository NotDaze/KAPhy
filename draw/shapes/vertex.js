if(!Draw.vertex) {
  Draw.vertex = function(x, y) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use Draw.vertex() in shape mode.");
      return;
    }
    
    Canvas.context.lineTo(x, y);
  };
}
