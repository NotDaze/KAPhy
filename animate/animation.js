if(!Animate.Animation) {
  Animate.Animation = function(config) {
    if(config.transition) {
      if(!Animate.transitions[config.transition]) {
        console.warn("KAPhy Warning - Invalid animation transition specified. Defaulted to linear.");
        config.transition = "linear";
      }
    }
    
    this.duration = config.duration || 1000;
    this.startTime = new Date().getTime();
    
    this.startValue = config.start || 0;
    this.finalValue = config.final || 1;
    
    this.transition = config.transition || "linear";
  };
  Animate.Animation.getValue = function() {
    return this.startValue + (this.finalValue - this.startValue) * 
           Animate.transitions[this.transition](new Date().getTime() - this.startTime)/this.duration);
  };
}
