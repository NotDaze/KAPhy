Canvas.getX = function(x) {
  return x * Canvas.element.width/Canvas.relWidth;
};
Canvas.getY = function(y) {
  return y * Canvas.element.height/Canvas.relHeight;
};
