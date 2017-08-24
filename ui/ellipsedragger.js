if(!KAPhy.Interface.EllipseDragger) {
  KAPhy.Interface.EllipseDragger = function(config) {
    KAPhy.Interface.EllipseButton.call(this, config);
    
    this.onMove = config.onMove || function() {};
  };
  KAPhy.Interface.EllipseDragger.prototype = Object.create(KAPhy.Interface.EllipseButton.prototype);
  KAPhy.Interface.EllipseDragger.prototype.drag = function() {
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
