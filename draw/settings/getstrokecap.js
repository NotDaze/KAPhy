if(!Draw.getStrokeCap) {
  Draw.getStrokeCap = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    return Canvas.context.lineCap;
  };
}
