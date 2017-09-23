if(!KAPhy.Draw.rotate) {
  KAPhy.Draw.rotate = function(t) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length !== 1) {
      console.warn("KAPhy Warning - KAPhy.Draw.rotate() takes 1 argument.");
      return;
    }
    
    KAPhy.Canvas.context.rotate(t);
  };
}
