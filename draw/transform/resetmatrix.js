if(!KAPhy.Draw.resetMatrix) {
  KAPhy.Draw.resetMatrix = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You cannot use transformation commands in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.setTransform(1, 0, 0, 1, 0, 0);
  };
}
