Canvas.resize = function(relWidth, relHeight) {
  console.log("Canvas Resized To Relative Dimensions - " + relWidth + ", " + relHeight);
  
  if(window.innerWidth/window.innerHeight < relWidth/relHeight) {
    Canvas.element.width  = window.innerWidth;
    Canvas.element.height = relHeight/relWidth * window.innerWidth;
  }
  else {
    Canvas.width  = relWidth/relHeight * window.innerHeight;
    Canvas.height = window.innerHeight;
  }
};
