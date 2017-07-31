if(!Draw.getStrokeJoin) {
  Draw.getStrokeJoin = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    return Canvas.context.lineJoin;
  };
}
