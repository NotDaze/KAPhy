if (!Draw.rect) {
  Draw.rect = function(x, y, w, h, tl, tr, br, bl) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    if(arguments.length > 8 || arguments.length < 4) {
      console.warn("KAPhy Warning - Draw.rect() takes 4 - 8 arguments.");
      return;
    }
    
    var realX = x,
      realY = y,
      realW = w,
      realH = h;

    switch (Draw.currentRectMode) {
      case CORNERS:
        realW = w - x;
        realH = h - y;
        break;
      case RADIUS:
        realX = x + w / 2;
        realY = y + h / 2;
        realW = w * 2;
        realH = h * 2;
        break;
      case CENTER:
        realX = x - w / 2;
        realY = y - h / 2;
        break;
    }
    
    realX = Canvas.getX(realX);
    realY = Canvas.getY(realY);
    realW = Canvas.getX(realW);
    realH = Canvas.getY(realH);
    
    tl = tl || 0;
    tr = tr || tl;
    br = br || tl;
    bl = bl || tl;

    Canvas.context.beginPath();

    Canvas.context.moveTo(realX + Canvas.getX(tl), realY);
    Canvas.context.lineTo(realX + realW - Canvas.getX(tr), realY);
    Canvas.context.quadraticCurveTo(realX + realW, realY, realX + realW, realY + Canvas.getY(tr));
    Canvas.context.lineTo(realX + realW, realY + realH - Canvas.getY(br));
    Canvas.context.quadraticCurveTo(realX + realW, realY + realH, realX + realW - Canvas.getX(br), realY + realH);
    Canvas.context.lineTo(realX + Canvas.getX(bl), realY + realH);
    Canvas.context.quadraticCurveTo(realX, realY + realH, realX, realY + realH - Canvas.getY(bl));
    Canvas.context.lineTo(realX, realY + Canvas.getY(tl));
    Canvas.context.quadraticCurveTo(realX, realY, realX + Canvas.getX(tl), realY);
    Canvas.context.closePath();

    Canvas.context.fill();
    Canvas.context.stroke();
  };
}
