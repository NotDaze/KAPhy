if(!Draw.strokeCap) {
  Draw.strokeCap = function(newCap) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newCap === ROUND || newCap === SQUARE || newCap === PROJECT) {
      Canvas.context.lineCap = newCap;
    }
  };
}
