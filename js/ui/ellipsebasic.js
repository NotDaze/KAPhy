if(!KAPhy.Interface.EllipseBasic) {
  KAPhy.Interface.EllipseBasic = function(config) {
    KAPhy.Interface.Basic.call(this, config);
  };
  KAPhy.Interface.EllipseBasic.prototype = Object.create(KAPhy.Interface.Basic.prototype);
  KAPhy.Interface.EllipseBasic.prototype.mouseOver = function() {
    return Math.sqrt((KAPhy.Canvas.mouseX - this.pos.x) * (KAPhy.Canvas.mouseX - this.pos.x) * this.height/this.width * this.height/this.width +
                     (KAPhy.Canvas.mouseY - this.pos.y) * (KAPhy.Canvas.mouseY - this.pos.y)) < this.height/2;
  };
  KAPhy.Interface.EllipseBasic.prototype.pmouseOver = function() {
    return Math.sqrt((KAPhy.Canvas.pmouseX - this.pos.x) * (KAPhy.Canvas.pmouseX - this.pos.x) * this.height/this.width * this.height/this.width +
                     (KAPhy.Canvas.pmouseY - this.pos.y) * (KAPhy.Canvas.pmouseY - this.pos.y)) < this.height/2;
  };
  KAPhy.Interface.EllipseBasic.prototype.draw = function() {
    KAPhy.Draw.ellipse(this.pos.x, this.pos.y, this.width, this.height);
  };
}