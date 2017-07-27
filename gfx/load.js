if(!loaded) {
  var Images = {};
  var imagesLoaded = 0;
  var loaded = true;
  for(var i in ImagesToLoad) {
    var oldVal = ImagesToLoad[i];
    ImagesToLoad[i] = new Image();
    ImagesToLoad[i].onload = function() {
      imagesLoaded++;
      Images[i] = this;
    };
    ImagesToLoad[i].src = oldVal;
  }
}
