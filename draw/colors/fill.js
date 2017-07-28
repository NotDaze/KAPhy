if(!Draw.fill) {
  /** Draw.fill
    Draw.fill sets the canvas context's fill color.
    
    @link    https://cdn.rawgit.com/TemporalFuzz/KAPhy/edit/master/draw/colors/fill.js
    @author  TemporalFuzz
    @version 1.0
  */
  Draw.fill = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    /*
      If no arguments: Defaults to white
      If one argument: Gray of brightness depending on argument
      If two arguments: First argument is brightness; second is alpha
      If three arguments: Typical RGB
      If four arguments: Typical RGBA
    */
    
    switch(arguments.length) {
      case 0: Canvas.context.fillStyle = "#FFFFFF"; break;
      case 1: Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; break;
      case 2: Canvas.context.fillStyle = "rgba(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ", " + (arguments[1]/255) + ")"; break;
      case 3: Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")"; break;
      case 4: Canvas.context.fillStyle = "rgba(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ", " + (arguments[3]/255) + ")";
      default: console.warn("KAPhy Warning - Draw.fill() takes 0 - 4 arguments."); break;
    }
  };
}
