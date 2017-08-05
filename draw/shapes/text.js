if(!Draw.text) {
  Draw.text = function(content, x, y) {
    
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 3) {
      console.warn("KAPhy Warning - Draw.text() takes 1 - 3 arguments.");
    }
    
    var size = Draw.getTextSize();
    
    var enterSplit = content.split("\n");
    
    var adjust = 0;
    if(Draw.getTextBaseline().toLowerCase() === "middle") {
      adjust = -0.5 * (enterSplit.length - 1) * size * (1 + Draw.currentTextLineSpacing);
    }
    
    
    for(var i = 0; i < enterSplit.length; i++) {
      Canvas.context.fillText(enterSplit[i], Canvas.toPixels(x || 0), adjust + Canvas.toPixels(y || 0) + i * size * (1 + Draw.currentTextLineSpacing));
    }
  };
}
