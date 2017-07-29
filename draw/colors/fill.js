if(!Draw.fill) {
  Draw.fill = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    /*
      If no arguments: Defaults to white
      If one argument: Gray of brightness depending on argument
      If one argument: Sets color based on the object's r, g, b, and a properties.
      If two arguments: First argument is brightness; second is alpha
      If three arguments: Typical RGB
      If four arguments: Typical RGBA
    */
    
    if(arguments.length >= 1) {
      if(typeof arguments[0] === "object") {
        Canvas.context.fillStyle = "rgba(" + arguments[0].r + ", " + arguments[0].g + ", " + arguments[0].b + ", " + (arguments[0].a/255) + ")";
        return;
      }
    }
    
    switch(arguments.length) {
        //could this be changed to make 1-4 look more better? Maybe using {}?
      case 0: Canvas.context.fillStyle = "#FFFFFF"; break;
      case 1: Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; break;
      case 2: Canvas.context.fillStyle = "rgba(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ", " + (arguments[1]/255) + ")"; break;
      case 3: Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")"; break;
      case 4: Canvas.context.fillStyle = "rgba(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ", " + (arguments[3]/255) + ")"; break;
      default: console.warn("KAPhy Warning - Draw.fill() takes 0 - 4 arguments."); break;
    }
  };
}
