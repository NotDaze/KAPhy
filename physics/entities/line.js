if (!Physics.Line || KAPhy.version !== KAPhy.current) {
  Physics.Line = function(config) {
    this.one = config.one || new Vector2();
    this.two = config.two || new Vector2();
    
    this.one = new Vector2(Canvas.getX(this.one.x), Canvas.getY(this.one.y));
    this.two = new Vector2(Canvas.getX(this.two.x), Canvas.getY(this.two.y));

    /** Bounce Coefficient **/
    this.bcf = config.bcf || 0.75;

    /** Radius **/
    this.rad = config.rad || 4;
  };
  Physics.Line.prototype.draw = function() {
    var sw = Draw.getStrokeWeight();
    Draw.strokeWeight(this.rad * 2);
    Draw.line(this.one.x, this.one.y, this.two.x, this.two.y);
    Draw.strokeWeight(sw);
  };
}
