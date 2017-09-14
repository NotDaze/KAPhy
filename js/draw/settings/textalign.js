if(!KAPhy.Draw.textAlign) {
  KAPhy.Draw.textAlign = function(newAlign, yAlign) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.textAlign() takes 0 - 2 arguments.");
    }
    
    KAPhy.Canvas.context.textAlign = newAlign || "left";
    if(yAlign) KAPhy.Canvas.context.textBaseline = yAlign;
  };
}
