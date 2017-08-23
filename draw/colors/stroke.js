if(!KAPhy.Draw.stroke) {
  KAPhy.Draw.stroke = function(r, g, b, a) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length >= 1) {
      if(typeof arguments[0] === "object") {
        KAPhy.Canvas.context.strokeStyle = "rgba(" + arguments[0].r + ", " + arguments[0].g + ", " + arguments[0].b + ", " + (arguments[0].a/255) + ")";
        return;
      }
    }
    
    switch(arguments.length) {
      case 0: KAPhy.Canvas.context.strokeStyle = "#FFFFFF"; break;
      case 1: KAPhy.Canvas.context.strokeStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; break;
      case 2: KAPhy.Canvas.context.strokeStyle = "rgba(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ", " + (arguments[1]/255) + ")"; break;
      case 3: KAPhy.Canvas.context.strokeStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")"; break;
      case 4: KAPhy.Canvas.context.strokeStyle = "rgba(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ", " + (arguments[3]/255) + ")"; break;
      default: console.warn("KAPhy Warning - KAPhy.Draw.stroke() takes 0 - 4 arguments.");
    }
  };
}
