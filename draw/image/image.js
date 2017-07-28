if(!Draw.image) {
  Draw.image = function(image, x, y, w, h, sx, sy, sw, sh) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    switch(arguments.length) {
      case 3: Canvas.context.drawImage(image, x, y); break;
      case 5: Canvas.context.drawImage(image, x, y, w, h); break;
      case 9: Canvas.context.drawImage(image, x, y, w, h, sx, sy, sw, sh); break;
    }
  };
}
