if(!Draw.loadImageSet) {
  Draw.loadImageSet = function() {
    if(arguments.length === 0) {
      console.warn("KAPhy Warning - Draw.loadImageSet() takes at least 1 argument.");
      return;
    }
    
    var imagesLoaded = 0;
    var imagesToLoad = arguments;
    var loadedImages = [];
    imagesToLoad.pop();
    var onFinish = arguments[arguments.length - 1];
    
    for(var i = 0; i < imagesToLoad.length; i++) {
      Draw.loadImage(imagesToLoad[i], function() {
        loadedImages.push(this);
        imagesLoaded++;
        if(imagesLoaded >= imagesToLoad.length) {
          onFinish.call(loadedImages);
        }
      });
    }
  };
}
