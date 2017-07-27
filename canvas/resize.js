Canvas.resize = function(relWidth, relHeight) {
  console.log("Canvas Resized To Relative Dimensions - " + relWidth + ", " + relHeight);
  
  Canvas.relWidth = relWidth;
  Canvas.relHeight = relHeight;
  
  if(window.innerWidth/window.innerHeight < relWidth/relHeight) {
    Canvas.element.width  = window.innerWidth;
    Canvas.element.height = relHeight/relWidth * window.innerWidth;
  }
  else {
    Canvas.element.width  = relWidth/relHeight * window.innerHeight;
    Canvas.element.height = window.innerHeight;
  }
};
