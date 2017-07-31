if(!Draw.pushMatrix) {
  Draw.pushMatrix = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    Canvas.context.save();
  };
}
