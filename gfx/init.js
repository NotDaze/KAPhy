if(!loaded) {
  var loaded = true
  
  var gfxLoaded = {};
  
  var testImage = new Image();
  
  testImage.src = "./testimage.png";
  testImage.onload = function() {
    gfxLoaded.testImage = testImage;
  };
}
