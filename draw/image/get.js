if(!KAPhy.Draw.get) {
  KAPhy.Draw.get = function(x, y, w, h) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length === 4) {
      var imageData = KAPhy.Canvas.context.getImageData(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y), KAPhy.Canvas.toPixels(w), KAPhy.Canvas.toPixels(h));
      var newCanvas = document.createElement("canvas");
      newCanvas.width  = imageData.width;
      newCanvas.height = imageData.height;
      newCanvas.getContext("2d").putImageData(imageData, 0, 0);
      return newCanvas;
    }
    else if(arguments.length === 2) {
      var dataAtPoint = KAPhy.Canvas.context.getImageData(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y), 1, 1);
      return {
        r: dataAtPoint.data[0],
        g: dataAtPoint.data[1],
        b: dataAtPoint.data[2],
        a: dataAtPoint.data[3] * 255
      };
    }
  };
}
