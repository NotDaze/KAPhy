if(!Draw.getFill) {
  Draw.getFill = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var fillStyle = Canvas.context.fillStyle.split(", ");
    fillStyle[0] = fillStyle[0].split("");
    fillStyle[0].splice(0, 5);
    fillStyle[0] = parseFloat(fillStyle[0].join(""));
    fillStyle[1] = parseFloat(fillStyle[1]);
    fillStyle[2] = parseFloat(fillStyle[2]);
    fillStyle[3] = fillStyle[3].split("");
    fillStyle[3].pop();
    fillStyle[3] = parseFloat(fillStyle[3].join(""));
    
    return {
      r: fillStyle[0],
      g: fillStyle[1], 
      b: fillStyle[2],
      a: fillStyle[3] * 255
    };
  };
}
