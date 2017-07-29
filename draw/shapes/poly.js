if(!Draw.poly) {
  Draw.poly = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    Canvas.context.beginPath();
    Canvas.context.moveTo(Canvas.getX(arguments[0]), Canvas.getY(arguments[1]));
    for(var i = 2; i < arguments.length; i += 2) {
      Canvas.context.lineTo(Canvas.getX(arguments[i]), Canvas.getY(arguments[i + 1]));
    }
    Canvas.context.closePath();
    
    Canvas.context.fill();
    Canvas.context.stroke();
  };
}
