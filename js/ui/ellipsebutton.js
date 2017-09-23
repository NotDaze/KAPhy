if(!KAPhy.Interface.EllipseButton) {
  KAPhy.Interface.EllipseButton = function(config) {
    KAPhy.Interface.EllipseBasic.call(this, config);
    
    this.onHold = config.onHold || function() {};
    this.onHover = config.onHover || function() {};
    this.onPress = config.onPress || function() {};
    this.onRelease = config.onRelease || function() {};
  };
  KAPhy.Interface.EllipseButton.prototype = Object.create(KAPhy.Interface.EllipseBasic.prototype);
  KAPhy.Interface.EllipseButton.prototype.update = function() {
    if(this.mouseOver()) this.onHover();
    if(this.down()) this.onHold();
    if(this.pressed()) this.onPress();
    if(this.released()) this.onRelease();
  };
}