if(!Draw.loadImage) {
  Draw.loadImage = function(imageName, onLoad) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var imageToLoad = new Image();
    imageToLoad.onload = onLoad;
    imageToLoad.src = Images[imageName];
  };
}
