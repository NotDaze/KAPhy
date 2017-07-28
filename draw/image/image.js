if(!Draw.image) {
  Draw.image = function(image, x, y, w, h) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    Canvas.context.drawImage(image, x, y, w, h);
  };
}
