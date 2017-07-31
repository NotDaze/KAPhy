if(!Draw.textAlign) {
  Draw.textAlign = function(newAlign) {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 1) {
      console.warn("KAPhy Warning - Draw.textAlign() takes 1 argument.");
    }
    
    Canvas.context.textAlign = newAlign;
  };
}
