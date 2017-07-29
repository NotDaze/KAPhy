if(!Canvas.getX || KAPhy.version !== KAPhy.current) {
  Canvas.getX = function(x) {
    return x * Canvas.element.width/Canvas.relWidth;
  };
}
if(!Canvas.getY || KAPhy.version !== KAPhy.current) {
  Canvas.getY = function(y) {
    return y * Canvas.element.height/Canvas.relHeight;
  };
}
