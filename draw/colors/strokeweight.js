if(!Draw.strokeWeight) {
  Draw.strokeWeight = function(strokeWeight) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    Canvas.context.lineWidth = strokeWeight || 0;
  };
}
