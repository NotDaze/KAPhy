if(!Draw.endShape) {
  Draw.endShape = function() {
    if(!Draw.shapeOn) {
      console.warn("KAPhy Warning - Cannot end nonexistent shape.");
      return;
    }
    
    Canvas.context.fill();
    Canvas.context.stroke();
    Draw.shapeOn = false;
  };
}
