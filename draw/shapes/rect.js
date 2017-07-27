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
  
  ctx.beginPath();
  ctx.moveTo(realX + tl, realY);
  ctx.lineTo(realX + realW - tr, realY);
  ctx.quadraticCurveTo(realX + realW, realY, realX + realW, realY + tr);
  ctx.lineTo(realX + realW, realY + realH - br);
  ctx.quadraticCurveTo(realX + realW, realY + realH, realX + realW - br, realY + realH);
  ctx.lineTo(realX + bl, realY + realH);
  ctx.quadraticCurveTo(x, realY + realH, realX, realY + realH - bl);
  ctx.lineTo(realX, realY + tl);
  ctx.quadraticCurveTo(realX, realY, realX + tl, realY);
  ctx.closePath();
  
  ctx.fill();
  ctx.stroke();
};
