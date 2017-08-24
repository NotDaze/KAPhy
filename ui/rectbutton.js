if(!KAPhy.Interface.RectButton) {
  KAPhy.Interface.RectButton = function(config) {
    KAPhy.Interface.RectBasic.call(this, config);
    
    this.onHold = config.onHold || function() {};
    this.onHover = config.onHover || function() {};
    this.onPress = config.onPress || function() {};
    this.onRelease = config.onRelease || function() {};
  };
  KAPhy.Interface.RectButton.prototype = Object.create(KAPhy.Interface.RectBasic.prototype);
  KAPhy.Interface.RectButton.prototype.update = function() {
    if(this.mouseOver()) this.onHover();
    if(this.down()) this.onHold();
    if(this.pressed()) this.onPress();
    if(this.released()) this.onRelease();
  };
}