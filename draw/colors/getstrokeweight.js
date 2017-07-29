if(!Draw.getStrokeWeight || KAPhy.version !== KAPhy.current) {
  Draw.getStrokeWeight = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    return Canvas.context.lineWidth || 0;
  };
}
