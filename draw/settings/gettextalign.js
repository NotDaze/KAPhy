if(!KAPhy.Draw.getTextAlign) {
  KAPhy.Draw.getTextAlign = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length > 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.getTextAlign() takes 0 arguments.");
    }
    
    return KAPhy.Canvas.context.textAlign;
  };
}
