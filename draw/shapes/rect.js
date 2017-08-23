if (!KAPhy.Draw.rect) {
  KAPhy.Draw.rect = function(x, y, w, h, tl, tr, br, bl) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    if(arguments.length > 8 || arguments.length < 4) {
      console.warn("KAPhy Warning - KAPhy.Draw.rect() takes 4 - 8 arguments.");
      return;
    }
    
    var realX = x,
      realY = y,
      realW = w,
      realH = h;

    switch (KAPhy.Draw.currentRectMode) {
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
    
    realX = KAPhy.Canvas.toPixels(realX);
    realY = KAPhy.Canvas.toPixels(realY);
    realW = KAPhy.Canvas.toPixels(realW);
    realH = KAPhy.Canvas.toPixels(realH);
    
    tl = tl || 0;
    tr = tr || tl;
    br = br || tl;
    bl = bl || tl;

    KAPhy.Canvas.context.beginPath();

    KAPhy.Canvas.context.moveTo(realX + KAPhy.Canvas.toPixels(tl), realY);
    KAPhy.Canvas.context.lineTo(realX + realW - KAPhy.Canvas.toPixels(tr), realY);
    KAPhy.Canvas.context.quadraticCurveTo(realX + realW, realY, realX + realW, realY + KAPhy.Canvas.toPixels(tr));
    KAPhy.Canvas.context.lineTo(realX + realW, realY + realH - KAPhy.Canvas.toPixels(br));
    KAPhy.Canvas.context.quadraticCurveTo(realX + realW, realY + realH, realX + realW - KAPhy.Canvas.toPixels(br), realY + realH);
    KAPhy.Canvas.context.lineTo(realX + KAPhy.Canvas.toPixels(bl), realY + realH);
    KAPhy.Canvas.context.quadraticCurveTo(realX, realY + realH, realX, realY + realH - KAPhy.Canvas.toPixels(bl));
    KAPhy.Canvas.context.lineTo(realX, realY + KAPhy.Canvas.toPixels(tl));
    KAPhy.Canvas.context.quadraticCurveTo(realX, realY, realX + KAPhy.Canvas.toPixels(tl), realY);
    KAPhy.Canvas.context.closePath();

    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
  };
}
