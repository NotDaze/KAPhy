if(!KAPhy.Draw.image) {
  KAPhy.Draw.image = function(image, x, y, w, h, sx, sy, sw, sh) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other drawing commands when in shape mode.");
      return;
    }
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch (KAPhy.Draw.currentImageMode) {
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
    
    switch(arguments.length) {
      case 3: KAPhy.Canvas.context.drawImage(image, realX, realY); break;
      case 5: KAPhy.Canvas.context.drawImage(image, realX, realY, realW, realH); break;
      case 9: KAPhy.Canvas.context.drawImage(image, realX, realY, realW, realH, sx, sy, sw, sh); break;
      default: console.warn("KAPhy Warning - KAPhy.Draw.image() takes 3, 5, or 9 arguments."); break;
    }
  };
}
