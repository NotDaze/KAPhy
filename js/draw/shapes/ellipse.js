if(!KAPhy.Draw.ellipse) {
  KAPhy.Draw.ellipse = function(x, y, w, h) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch(KAPhy.Draw.currentEllipseMode) {
      case CORNER: 
        realX = x - w/2;
        realY = y - h/2; break;
      case CORNERS:
        realX = (x + w)/2;
        realY = (y + h)/2;
        realW = w - x;
        realH = h - y; break;
      case RADIUS: 
        realW = w * 2;
        realH = h * 2; break;
    }
    
    if(KAPhy.Canvas.configured) {
      realX = KAPhy.Canvas.toPixels(realX);
      realY = KAPhy.Canvas.toPixels(realY);
      realW = KAPhy.Canvas.toPixels(realW/2);
      realH = KAPhy.Canvas.toPixels(realH/2);
    }
    
    KAPhy.Canvas.context.ellipse(realX, realY, realW, realH, 0, 0, 6.3);
    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
  };
}
