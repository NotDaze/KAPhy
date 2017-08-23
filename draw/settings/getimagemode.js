if(!KAPhy.Draw.getImageMode) {
  KAPhy.Draw.getImageMode = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Draw.currentImageMode;
  };
}
