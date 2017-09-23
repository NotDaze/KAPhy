if(!KAPhy.Draw.beginShape) {
  KAPhy.Draw.beginShape = function() {
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - Cannot reinitialize shape.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Draw.shapeOn = true;
  };
}
