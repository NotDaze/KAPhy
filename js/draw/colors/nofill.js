if(!KAPhy.Draw.noFill) {
  KAPhy.Draw.noFill = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    KAPhy.Canvas.context.fillStyle = "rgba(0, 0, 0, 0.0)";
  };
}
