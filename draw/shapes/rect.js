Draw.rect = function(x, y, w, h, tl, tr, br, bl) {
  var realX = x, 
      realY = y,
      realW = w, 
      realH = h;
  
  switch(Draw.currentRectMode) {
    case CORNERS: realW = w - x;
                  realH = h - y; break;
    case RADIUS: realX = x + w/2;
                 realY = y + h/2;
                 realW = w * 2;
                 realH = h * 2; break;
    case CENTER: realX = x - w/2; 
                 realY = y - h/2; break;
  }
  
  tl = tl || 0;
  tr = tr || tl;
  br = br || tl;
  bl = bl || tl;
  
  Canvas.context.beginPath();
  
  Canvas.context.moveTo(realX + tl, realY);
  Canvas.context.lineTo(realX + realW - tr, realY);
  Canvas.context.quadraticCurveTo(realX + realW, realY, realX + realW, realY + tr);
  Canvas.context.lineTo(realX + realW, realY + realH - br);
  Canvas.context.quadraticCurveTo(realX + realW, realY + realH, realX + realW - br, realY + realH);
  Canvas.context.lineTo(realX + bl, realY + realH);
  Canvas.context.quadraticCurveTo(x, realY + realH, realX, realY + realH - bl);
  Canvas.context.lineTo(realX, realY + tl);
  Canvas.context.quadraticCurveTo(realX, realY, realX + tl, realY);
  Canvas.context.closePath();
  
  Canvas.context.fill();
  Canvas.context.stroke();
};
