if(!Animation.prototype.getValue) {
  Animation.prototype.getValue = function() {
    return this.startValue + (this.finalValue - this.startValue) * 
           Animation.transitions[this.transition](new Date().getTime() - this.startTime)/this.duration);
  };
}
if(!Animation.prototype.isExpired) {
  Animation.prototype.isExpired = function() {
    return new Date().getTime() - this.startTime <= this.duration;
  };
}
