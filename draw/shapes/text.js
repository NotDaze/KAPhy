if(!KAPhy.Draw.text) {
  KAPhy.Draw.text = function(content, x, y) {
    
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 3) {
      console.warn("KAPhy Warning - KAPhy.Draw.text() takes 1 - 3 arguments.");
    }
    
    var size = KAPhy.Draw.getTextSize();
    
    var enterSplit = content.split("\n");
    
    var adjust = 0;
    if(KAPhy.Draw.getTextBaseline().toLowerCase() === "middle") {
      adjust = -0.5 * (enterSplit.length - 1) * size * (1 + KAPhy.Draw.currentTextLineSpacing);
    }
    
    
    for(var i = 0; i < enterSplit.length; i++) {
      KAPhy.Canvas.context.fillText(enterSplit[i], KAPhy.Canvas.toPixels(x || 0), adjust + KAPhy.Canvas.toPixels(y || 0) + i * size * (1 + KAPhy.Draw.currentTextLineSpacing));
    }
  };
}
