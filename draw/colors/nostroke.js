if(!KAPhy.Draw.noStroke) {
  KAPhy.Draw.noStroke = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.noStroke() takes 0 arguments.");
    }
    
    KAPhy.Canvas.context.strokeStyle = "rgba(0, 0, 0, 0.0)";
  };
}
