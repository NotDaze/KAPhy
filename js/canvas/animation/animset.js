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