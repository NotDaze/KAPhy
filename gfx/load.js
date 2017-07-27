var Images = {},
    imageCount = 0;

var onFinish = function() {};

if(!loaded) {
  var imagesLoaded = 0;
  var loaded = true;
  for(var i in ImagesToLoad) {
    imageCount++;
    var oldVal = ImagesToLoad[i];
    ImagesToLoad[i] = new Image();
    ImagesToLoad[i].onload = function() {
      imagesLoaded++;
      Images[i] = this;
      if(imagesLoaded === imageCount) {
        onFinish();
      }
    };
    ImagesToLoad[i].src = oldVal;
  }
}
