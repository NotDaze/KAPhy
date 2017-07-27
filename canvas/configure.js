Canvas.configure = function(canvasElement) {
  if(this.configured) {
    console.warn("KAPhy warning - Attempted to reconfigure canvas.");
    return;
  }
  
  Canvas.element = canvasElement;
  Canvas.configured = true;
  
  Canvas.relWidth  = canvasElement.width;
  Canvas.relHeight = canvasElement.height;
  
  Canvas.context = canvasElement.getContext("2d");
};
