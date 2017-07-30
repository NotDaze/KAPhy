if(!Draw.background || KAPhy.version !== KAPhy.current) {
  Draw.background = function(r, g, b, a) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    var oldFill = Canvas.context.fillStyle;
    
    Canvas.context.save();
    Canvas.context.resetTransform();
    
    switch(arguments.length) {
      case 0: Draw.fill(); break;
      case 1: Draw.fill(r); break;
      case 2: Draw.fill(r, g); break;
      case 3: Draw.fill(r, g, b); break;
      case 4: Draw.fill(r, g, b, a); break;
    }
    
    Canvas.context.fillRect(0, 0, Canvas.element.width, Canvas.element.height);
    
    Canvas.context.restore();
  }
}
