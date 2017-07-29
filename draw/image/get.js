if(!Draw.get || KAPhy.version !== KAPhy.current) {
  Draw.get = function(x, y, w, h) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length === 4) {
      var imageData = Canvas.context.getImageData(Canvas.getX(x), Canvas.getY(y), Canvas.getX(w), Canvas.getY(h));
      var newCanvas = document.createElement("canvas");
      newCanvas.width  = imageData.width;
      newCanvas.height = imageData.height;
      newCanvas.getContext("2d").putImageData(imageData, 0, 0);
      return newCanvas;
    }
    else if(arguments.length === 2) {
      var dataAtPoint = Canvas.context.getImageData(Canvas.getX(x), Canvas.getY(y), 1, 1);
      return {
        r: dataAtPoint.data[0],
        g: dataAtPoint.data[1],
        b: dataAtPoint.data[2],
        a: dataAtPoint.data[3] * 255
      };
    }
  };
}
