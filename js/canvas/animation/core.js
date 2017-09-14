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
