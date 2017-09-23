if(!KAPhy.Draw.scale) {
  KAPhy.Draw.scale = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.scale() takes 1 - 2 arguments.");
      return;
    }
    
    KAPhy.Canvas.context.scale(x, y || x);
  };
}
