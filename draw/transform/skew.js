if(!KAPhy.Draw.skew) {
  KAPhy.Draw.skew = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.skew() takes 1 - 2 arguments.");
      return;
    }
    
    KAPhy.Canvas.context.transform(1, x, y || 0, 1, 0, 0);
  };
}
