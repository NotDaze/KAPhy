if(!Draw.image || KAPhy.version !== KAPhy.current) {
  Draw.image = function(image, x, y, w, h, sx, sy, sw, sh) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other drawing commands when in shape mode.");
      return;
    }
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch (Draw.currentImageMode) {
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
    
    switch(arguments.length) {
      case 3: Canvas.context.drawImage(image, realX, realY); break;
      case 5: Canvas.context.drawImage(image, realX, realY, realW, realH); break;
      case 9: Canvas.context.drawImage(image, realX, realY, realW, realH, sx, sy, sw, sh); break;
      default: console.warn("KAPhy Warning - Draw.image() takes 3, 5, or 9 arguments."); break;
    }
  };
}
