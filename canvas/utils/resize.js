if (!Canvas.resize || KAPhy.version !== KAPhy.current) {
  Canvas.resize = function(relWidth, relHeight) {
    var envWidth = window.innerWidth;
    var envHeight = window.innerHeight;
    
    if(!envWidth  || envWidth  === 0) envWidth  = document.documentElement.clientWidth;
    if(!envHeight || envHeight === 0) envHeight = document.documentElement.clientHeight;
    
    if (!Canvas.configured) {
      console.warn("KAPhy warning - Attempted to resize when not configured");
      return;
    }

    Canvas.relWidth = relWidth;
    Canvas.relHeight = relHeight;

    if (envWidth / envHeight < relWidth / relHeight) {
      Canvas.element.width = envWidth;
      Canvas.element.height = relHeight / relWidth * envWidth;
    } else {
      Canvas.element.width = relWidth / relHeight * envHeight;
      Canvas.element.height = envHeight;
    }
  };
}
