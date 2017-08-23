if(!KAPhy.Draw.strokeJoin) {
  KAPhy.Draw.strokeJoin = function(newJoin) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newJoin === MITER || newJoin === ROUND || newJoin === BEVEL) {
      KAPhy.Canvas.context.lineJoin = newJoin;
    }
  };
}
