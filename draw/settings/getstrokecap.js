if(!KAPhy.Draw.getStrokeCap) {
  KAPhy.Draw.getStrokeCap = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Canvas.context.lineCap;
  };
}
