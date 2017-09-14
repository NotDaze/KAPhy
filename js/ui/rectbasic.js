if(!KAPhy.Interface.RectBasic) {
  KAPhy.Interface.RectBasic = function(config) {
    KAPhy.Interface.Basic.call(this, config);
  };
  KAPhy.Interface.RectBasic.prototype = Object.create(KAPhy.Interface.Basic.prototype);
  KAPhy.Interface.RectBasic.prototype.mouseOver = function() {
    return KAPhy.Canvas.mouseX >= this.pos.x && 
           KAPhy.Canvas.mouseY >= this.pos.y && 
           KAPhy.Canvas.mouseX <= this.pos.x + this.width &&
           KAPhy.Canvas.mouseY <= this.pos.y + this.height;
  };
  KAPhy.Interface.RectBasic.prototype.pmouseOver = function() {
    return KAPhy.Canvas.pmouseX >= this.pos.x && 
           KAPhy.Canvas.pmouseY >= this.pos.y && 
           KAPhy.Canvas.pmouseX <= this.pos.x + this.width &&
           KAPhy.Canvas.pmouseY <= this.pos.y + this.height;
  };
  KAPhy.Interface.RectBasic.prototype.draw = function() {
    KAPhy.Draw.rect(this.pos.x, this.pos.y, this.width, this.height);
  };
}