if(!KAPhy.Draw.getStrokeJoin) {
  KAPhy.Draw.getStrokeJoin = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Canvas.context.lineJoin;
  };
}
