if(!Animation.prototype.getValue) {
  Animation.prototype.getValue = function() {
    var stage = Animation.transitions[this.transition]((new Date().getTime() - this.startTime)/this.duration));
    
    if(stage < 0) { return this.startValue; }
    if(stage > 1) { return this.finalValue; }
    
    var val = (this.startValue + (this.finalValue - this.startValue) * stage;
    
    return val;
  };
}
if(!Animation.prototype.isExpired) {
  Animation.prototype.isExpired = function() {
    return ((new Date().getTime() - this.startTime) >= this.duration);
  };
}
