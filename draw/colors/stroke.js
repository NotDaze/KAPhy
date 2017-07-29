if(!Draw.stroke || KAPhy.version !== KAPhy.current) {
  Draw.stroke = function(r, g, b, a) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length >= 1) {
      if(typeof arguments[0] === "object") {
        Canvas.context.strokeStyle = "rgba(" + arguments[0].r + ", " + arguments[0].g + ", " + arguments[0].b + ", " + (arguments[0].a/255) + ")";
        return;
      }
    }
    
    switch(arguments.length) {
      case 0: Canvas.context.strokeStyle = "#FFFFFF"; break;
      case 1: Canvas.context.strokeStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; break;
      case 2: Canvas.context.strokeStyle = "rgba(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ", " + (arguments[1]/255) + ")"; break;
      case 3: Canvas.context.strokeStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")"; break;
      case 4: Canvas.context.strokeStyle = "rgba(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ", " + (arguments[3]/255) + ")"; break;
      default: console.warn("KAPhy Warning - Draw.stroke() takes 0 - 4 arguments.");
    }
  };
}
