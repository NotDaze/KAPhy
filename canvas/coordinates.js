if(!Canvas.getX) {
  Canvas.getX = function(x) {
    return x * Canvas.element.width/Canvas.relWidth;
  };
}
if(!Canvas.getY) {
  Canvas.getY = function(y) {
    return y * Canvas.element.height/Canvas.relHeight;
  };
}
