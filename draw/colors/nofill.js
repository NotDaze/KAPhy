if(!Draw.noFill) {
  Draw.noFill = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    Canvas.context.fillStyle = "rgba(0, 0, 0, 0.0)";
  };
}
