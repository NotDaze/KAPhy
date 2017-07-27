if(!Draw.arc) {
  Draw.arc = function(x, y, w, h, start, stop) {
    Canvas.context.beginPath();
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch(Draw.currentEllipseMode) {
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
    
    if(Canvas.configured) {
      realX = Canvas.getX(realX);
      realY = Canvas.getY(realY);
      realW = Canvas.getX(realW);
      realH = Canvas.getY(realH);
    }
    
    Canvas.context.ellipse(realX, realY, realW, realH, 0, start, stop);
    Canvas.context.fill();
    Canvas.context.stroke();
  };
}
