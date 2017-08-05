if(!Animation.prototype.getValue) {
  Animation.prototype.getValue = function() {
    if(this.looped) {
      var stage = Animation.transitions[this.transition](
        ((new Date().getTime() - this.startTime)/this.duration) % 1
      );
      
      return (this.startValue + (this.finalValue - this.startValue) * stage);
    }
    
    var stage = Animation.transitions[this.transition](((new Date().getTime() - this.startTime)/this.duration));
    
    if(stage < 0) { return this.startValue; }
    if(stage > 1) { return this.finalValue; }
    
    return (this.startValue + (this.finalValue - this.startValue) * stage);
  };
}
if(!Animation.prototype.getLoopValue) {
  
}
if(!Animation.prototype.isExpired) {
  Animation.prototype.isExpired = function() {
    return ((new Date().getTime() - this.startTime) >= this.duration);
  };
}
