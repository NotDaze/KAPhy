/** Main **/
if(!KAPhy.Canvas.Animation) {
  KAPhy.Canvas.Animation = function(config, looped) {
    if(config.transition) {
      if(!KAPhy.Canvas.Animation.transitions[config.transition]) {
        console.warn("KAPhy Warning - Invalid animation transition specified. Defaulted to linear.");
        config.transition = "linear";
      }
    }
    
    this.duration = config.duration || 1000;
    this.startTime = new Date().getTime();
    
    this.startValue = config.start || 0;
    this.finalValue = (config.final === 0 ? 0 : (config.end === 0 ? 0 : (config.end || (config.final || 1))));
    
    this.transition = config.transition || "linear";
    
    this.looped = looped || false;
  };
  KAPhy.Canvas.Animation.transitions = {
    linear: function(x) { return x; },
    easeInSine: function(x) { return -Math.sin((x + 1) * Math.PI/2) + 1; },
    easeOutSine: function(x) { return Math.sin(x * Math.PI/2); },
    easeInOutSine: function(x) { return Math.sin((x - 0.5) * Math.PI)/2 + 0.5; },
    easeInQuad: function(x) { return x * x; },
    easeOutQuad: function(x) { return x * (2 - x); },
    easeInOutQuad: function(x) { return x < 0.5 ? (2 * x * x) : (-2 * (--x) * x + 1); },
    easeInCubic: function(x) { return x * x * x; },
    easeOutCubic: function(x) { x--; return x * x * x + 1; },
    easeInOutCubic: function(x) { return x < 0.5 ? (4 * x * x * x) : (4 * (--x) * x * x + 1); },
    easeInQuart: function(x) { return x * x * x * x; },
    easeOutQuart: function(x) { x--; return -x * x * x * x + 1; },
    easeInOutQuart: function(x) { return x < 0.5 ? (8 * x * x * x * x) : (8 * (x - 1) * (x - 1) * (x - 1) * (x - 1) + 1); },
    easeInQuint: function(x) { return x * x * x * x * x; },
    easeOutQuint: function(x) { x--; return x * x * x * x * x + 1; },
    easeInOutQuint: function(x) { return x < 0.5 ? (16 * x * x * x * x * x) : (16 * (--x) * x * x * x * x + 1); },
  };
}

/** AnimationSet **/
if(!KAPhy.Canvas.AnimationSet) {
  KAPhy.Canvas.AnimationSet = function(info, looped) {
    this.animInfo = info.slice();
    
    this.looped = looped || false;
    
    if(this.looped) {
      this.animInfoBackup = this.animInfo.slice();
    }
    
    this.currentAnimation = new KAPhy.Canvas.Animation(this.animInfo.shift());
  };
}
if(!KAPhy.Canvas.AnimationSet.prototype.getValue) {
  KAPhy.Canvas.AnimationSet.prototype.getValue = function() {
    while(this.currentAnimation.isExpired()) {
      if(this.animInfo.length !== 0) {
        this.currentAnimation = new KAPhy.Canvas.Animation(this.animInfo.shift());
      } else if (this.looped) {
        this.animInfo = this.animInfoBackup.slice();
        this.currentAnimation = new KAPhy.Canvas.Animation(this.animInfo.shift());
      }
    }
    
    return this.currentAnimation.getValue();
  };
}
if(!KAPhy.Canvas.AnimationSet.prototype.isExpired) {
  KAPhy.Canvas.AnimationSet.prototype.isExpired = function() {
    if(this.animInfo.length === 0 && !this.looped) {
      return this.currentAnimation.isExpired();
    }
    return false;
  };
}

/** Core **/
if(!KAPhy.Canvas.Animation.getValue) {
  KAPhy.Canvas.Animation.getValue = function(data) {
    var now = new Date().getTime();
    var startTime = data.startTime;
    var duration = data.duration;
    
    var startVal = data.startValue;
    var endValue = data.finalValue;
    
    var stage;
    
    if(data.looped) {
      stage = KAPhy.Canvas.Animation.transitions[data.transition](
        ((now - startTime)/duration) % 1
      );
    }
    else {
      stage = KAPhy.Canvas.Animation.transitions[data.transition](
        ((now - startTime)/duration)
      );
      
      if(stage < 0) return startValue;
      if(stage > 1) return finalValue;
    }
    
    return (startValue + (finalValue - startValue) * stage);
  };
}
if(!KAPhy.Canvas.Animation.prototype.getValue) {
  KAPhy.Canvas.Animation.prototype.getValue = function() {
    return KAPhy.Canvas.Animation.getValue(this);
  };
}
if(!KAPhy.Canvas.Animation.prototype.isExpired) {
  KAPhy.Canvas.Animation.prototype.isExpired = function() {
    return ((new Date().getTime() - this.startTime) >= this.duration);
  };
}