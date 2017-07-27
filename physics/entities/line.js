Physics.Line = function(config) {
  this.one = config.one || new Vector2();
  this.two = config.two || new Vector2();
  
  /** Bounce Coefficient **/
  this.bcf = config.bcf || 0.75;
  
  /** Radius **/
  this.rad = config.rad || 4;
};
Physics.Line.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = this.rad * 2;
  ctx.moveTo(this.one.x, this.one.y);
  ctx.lineTo(this.two.x, this.two.y);
  ctx.stroke();
};
