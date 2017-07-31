if(!Draw.strokeJoin) {
  Draw.strokeJoin = function(newJoin) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newJoin === MITER || newJoin === ROUND || newJoin === BEVEL) {
      Canvas.context.lineJoin = newJoin;
    }
  };
}
