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
    
    Canvas.context.fillText(content, Canvas.toPixels(x || 0), Canvas.toPixels(y || 0));
  };
}
else console.log("HECK");
