if(!Draw.loadImage) {
  Draw.loadImage = function(imageName, onLoad) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - Draw.loadImage() takes 1 or 2 arguments.");
      return;
    }
    
    if(!Images[imageName]) {
      console.warn("KAPhy Warning - Tried to load invalid image.");
      return;
    }
    
    var imageToLoad = new Image();
    imageToLoad.onload = onLoad;
    imageToLoad.src = Images[imageName];
  };
}
