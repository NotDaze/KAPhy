if(!KAPhy.Interface.RectDragger) {
  KAPhy.Interface.RectDragger = function(config) {
    KAPhy.Interface.RectButton.call(this, config);
    
    this.onMove = config.onMove || function() {};
  };
  KAPhy.Interface.RectDragger.prototype = Object.create(KAPhy.Interface.RectButton.prototype);
  KAPhy.Interface.RectDragger.prototype.drag = function() {
    if(KAPhy.Interface.selected === this) {
      if(KAPhy.Canvas.pmouseX !== KAPhy.Canvas.mouseX ||
         KAPhy.Canvas.pmouseY !== KAPhy.Canvas.mouseY) {
        this.pos.x += KAPhy.Canvas.mouseX - KAPhy.Canvas.pmouseX;
        this.pos.y += KAPhy.Canvas.mouseY - KAPhy.Canvas.pmouseY;
        
        this.onMove();
      }
    }
  };
}