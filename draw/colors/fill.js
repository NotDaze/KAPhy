if(!Draw.fill) {
  Draw.fill = function(r, g, b, a) {
    switch(arguments.length) {
      case 0: Canvas.context.fillStyle = "#FFFFFF"; break;
      case 1: Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; break;
      case 2: 
        Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; 
        Canvas.context.globalAlpha = arguments[1]/255; break;
      case 3: Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")"; break;
      case 4: 
        Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")";
        Canvas.context.globalAlpha = arguments[3]/255;
    }
  };
}
