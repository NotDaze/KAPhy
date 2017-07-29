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
if(!Canvas.xFromConverted || KAPhy.version !== KAPhy.current) {
  Canvas.xFromConverted = function(x) {
    return x * Canvas.relWidth/Canvas.element.width;
  }
}
if(!Canvas.yFromConverted || KAPhy.version !== KAPhy.current) {
  Canvas.yFromConverted = function(y) {
    return y * Canvas.relHeight/Canvas.element.height;
  }
}
