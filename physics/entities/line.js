if (!Physics.Line || KAPhy.version !== KAPhy.current) {
  Physics.Line = function(config) {
    this.one = config.one || new Vector2();
    this.two = config.two || new Vector2();

    /** Bounce Coefficient **/
    this.bcf = config.bcf || 0.75;

    /** Radius **/
    this.rad = config.rad || 4;
  };
  Physics.Line.prototype.draw = function() {
    Draw.stroke(0);
    Draw.strokeWeight(this.rad * 2);
    Draw.line(this.one.x, this.one.y, this.two.x, this.two.y);
  };
}
