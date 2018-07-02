if(!KAPhy.Draw.background) {
  KAPhy.Draw.background = function(r, g, b, a) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    var oldFill = KAPhy.Canvas.context.fillStyle;
    
    KAPhy.Canvas.context.save();
    KAPhy.Canvas.context.resetTransform();
    
    switch(arguments.length) {
      case 0: 
        KAPhy.Canvas.context.clearRect(0, 0, KAPhy.Canvas.element.width, KAPhy.Canvas.element.height);
        return;
        break;
      case 1: KAPhy.Draw.fill(r); break;
      case 2: KAPhy.Draw.fill(r, g); break;
      case 3: KAPhy.Draw.fill(r, g, b); break;
      case 4: KAPhy.Draw.fill(r, g, b, a); break;
    }
    
    KAPhy.Canvas.context.fillRect(0, 0, KAPhy.Canvas.element.width, KAPhy.Canvas.element.height);
    
    KAPhy.Canvas.context.restore();
  }
}
