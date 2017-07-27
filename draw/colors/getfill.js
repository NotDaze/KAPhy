if(!Draw.getFill) {
  Draw.getFill = function() {
    var fillStyle = Canvas.context.fillStyle.split(", ");
    fillStyle[0] = fillStyle[0].split("");
    fillStyle[0].splice(0, 4);
    fillStyle[0] = parseFloat(fillStyle.join(""));
    fillStyle[1] = parseFloat(fillStyle[1]);
    fillStyle[2] = fillStyle[2].split("");
    fillStyle[2].pop();
    fillStyle[2] = parseFloat(fillStyle[2].join(""));
    
    return {
      r: fillStyle[0],
      g: fillStyle[1], 
      b: fillStyle[2],
      a: Canvas.context.globalAlpha * 255
    };
  };
}
