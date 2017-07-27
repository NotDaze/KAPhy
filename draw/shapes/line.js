if(!Draw.line) {
  Draw.line = function(x1, y1, x2, y2) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    Canvas.context.beginPath();
    Canvas.context.moveTo(x1, y1);
    Canvas.context.lineTo(x2, y2);
    Canvas.context.stroke();
  };
}
