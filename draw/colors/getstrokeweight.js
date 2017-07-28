if(!Draw.getStrokeWeight) {
  /* Draw.getStrokeWeight
    Draw.getStrokeWeight returns the canvas context's current stroke weight (or line width)
    
    @author  TemporalFuzz
    @version 1.0
    @returns Number current stroke weight
  */
  Draw.getStrokeWeight = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    return Canvas.context.lineWidth;
  };
}
