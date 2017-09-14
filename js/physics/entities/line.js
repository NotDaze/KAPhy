KAPhy.Physics.Line = function(config) {
 this.one = config.one || new KAPhy.Physics.Vector2();
 this.two = config.two || new KAPhy.Physics.Vector2();

 this.one = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.one.x), KAPhy.Canvas.toPixels(this.one.y));
 this.two = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.two.x), KAPhy.Canvas.toPixels(this.two.y));

 /** Bounce Coefficient **/
 this.bcf = config.bcf || 0.75;

 /** Radius **/
 this.rad = config.rad || 4;
};
KAPhy.Physics.Line.prototype.draw = function() {
 var sw = KAPhy.Draw.getStrokeWeight();
 KAPhy.Draw.strokeWeight(this.rad * 2);
 KAPhy.Draw.line(this.one.x, this.one.y, this.two.x, this.two.y);
 KAPhy.Draw.strokeWeight(sw);
};