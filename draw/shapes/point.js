if(!Draw.point) {
  Draw.point = function(x, y) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    Canvas.context.beginPath();
    Canvas.context.moveTo(x, y);
    Canvas.context.lineTo(x, y);
    Canvas.context.stroke();
  };
}
