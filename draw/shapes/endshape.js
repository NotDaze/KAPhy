if(!KAPhy.Draw.endShape) {
  KAPhy.Draw.endShape = function() {
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - Cannot end nonexistent shape.");
      return;
    }
    
    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
    KAPhy.Draw.shapeOn = false;
  };
}
