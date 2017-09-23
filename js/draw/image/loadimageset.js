if(!KAPhy.Draw.loadImageSet) {
  KAPhy.Draw.loadImageSet = function(imagesToLoad, onFinish) {
    if(arguments.length === 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.loadImageSet() takes at least 1 argument.");
      return;
    }
    
    var imagesLoaded = 0;
    var loadedImages = [];
    
    for(var i = 0; i < imagesToLoad.length; i++) {
      KAPhy.Draw.loadImage(imagesToLoad[i], function() {
        loadedImages.push(this);
        imagesLoaded++;
        if(imagesLoaded >= imagesToLoad.length) {
          onFinish.call(loadedImages);
        }
      });
    }
  };
}
