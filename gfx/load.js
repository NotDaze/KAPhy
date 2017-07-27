if(!loaded) {
  var Images = {};
  var imagesLoaded = 0;
  for(var i in ImagesToLoad) {
    var oldVal = ImagesToLoad[i];
    ImagesToLoad[i] = new Image();
    ImagesToLoad[i].onload = function() {
      imagesLoaded++;
      Images[i] = this;
    };
    Images[i].src = oldVal;
  }
}
