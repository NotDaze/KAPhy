if(!AnimationSet) {
  var AnimationSet = function(info, looped) {
    this.animInfo = info.slice();
    
    this.looped = looped || false;
    
    if(this.looped) {
      this.animInfoBackup = this.animInfo.slice();
    }
    
    this.currentAnimation = new Animation(this.animInfo.shift());
  };
}
if(!AnimationSet.prototype.getValue) {
  AnimationSet.prototype.getValue = function() {
    while(this.currentAnimation.isExpired()) {
      if(this.animInfo.length !== 0) {
        this.currentAnimation = new Animation(this.animInfo.shift());
      } else if (this.looped) {
        this.animInfo = this.animInfoBackup.slice();
        this.currentAnimation = new Animation(this.animInfo.shift());
      } else {
        return;
      }
    }
    
    return this.currentAnimation.getValue();
  };
}
if(!AnimationSet.prototype.isExpired) {
  AnimationSet.prototype.isExpired = function() {
    if(this.animInfo.length === 0 && !this.looped) {
      return this.currentAnimation.isExpired();
    }
    return false;
  };
}