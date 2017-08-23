if(!KAPhy.Draw.getTextBaseline) {
  KAPhy.Draw.getTextBaseline = function(newAlign, yAlign) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.textAlign() takes 0 arguments.");
    }
    
    return KAPhy.Canvas.context.textBaseline;
  };
}
