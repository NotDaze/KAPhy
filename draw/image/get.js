if(!Draw.get) {
  Draw.get = function(x, y, w, h) {
    var imageData = Canvas.context.getImageData(Canvas.getX(x), Canvas.getY(y), Canvas.getX(w), Canvas.getY(h));
    var newCanvas = document.createElement("canvas");
    newCanvas.width  = imageData.width;
    newCanvas.height = imageData.height;
    newCanvas.getContext("2d").putImageData(imageData, 0, 0);
    return newCanvas;
  };
}
