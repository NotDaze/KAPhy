if(!Draw.image) {
  Draw.image = function(image, x, y, w, h, sx, sy, sw, sh) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
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
      case 3: Canvas.context.drawImage(image, x, y); break;
      case 5: Canvas.context.drawImage(image, x, y, w, h); break;
      case 9: Canvas.context.drawImage(image, x, y, w, h, sx, sy, sw, sh); break;
      default: console.warn("KAPhy Warning - Draw.image() takes 3, 5, or 9 arguments."); break;
    }
  };
}
