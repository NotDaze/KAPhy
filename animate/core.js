if(!Animation.prototype.getValue) {
  Animation.prototype.getValue = function() {
    var val = this.startValue + (this.finalValue - this.startValue) * 
              Animation.transitions[this.transition](new Date().getTime() - this.startTime)/this.duration);
    
    if(val < 0) { return 0; }
    if(val > 1) { return 1; }
    
    return val;
  };
}
if(!Animation.prototype.isExpired) {
  Animation.prototype.isExpired = function() {
    return new Date().getTime() - this.startTime <= this.duration;
  };
}
