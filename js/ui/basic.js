if(!KAPhy.Interface.Basic) {
  KAPhy.Interface.Basic = function(config) {
    this.pos = config.pos || new KAPhy.Physics.Vector2(config.x || 0, config.y || 0);
    
    this.width = config.width || config.w || config.size || 100;
    this.height = config.height || config.h || config.size || 100;
  };
  KAPhy.Interface.Basic.prototype.down = function() {
    return this.mouseOver() && KAPhy.Canvas.mouseIsPressed;
  };
  KAPhy.Interface.Basic.prototype.pressed = function() {
    return this.mouseOver() && KAPhy.Canvas.mouseIsPressed && !KAPhy.Canvas.pmouseIsPressed;
  };
  KAPhy.Interface.Basic.prototype.released = function() {
    return this.mouseOver() && KAPhy.Canvas.pmouseIsPressed && !KAPhy.Canvas.mouseIsPressed;
  };
  KAPhy.Interface.Basic.prototype.select = function() {
    if(this.down() && !KAPhy.Interface.selected) {
      KAPhy.Interface.selected = this;
    }
  };
  KAPhy.Interface.Basic.prototype.display = function() {
    this.select();
    if(this.update) this.update();
    if(this.drag) this.drag();
  };
}