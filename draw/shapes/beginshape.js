if(!Draw.beginShape || KAPhy.version !== KAPhy.current) {
  Draw.beginShape = function() {
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - Cannot reinitialize shape.");
      return;
    }
    
    Canvas.context.beginPath();
    Draw.shapeOn = true;
  };
}
