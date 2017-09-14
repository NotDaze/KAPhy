if (!KAPhy.Canvas.resize) {
  KAPhy.Canvas.resize = function(relWidth, relHeight) {
    var envWidth = window.innerWidth;
    var envHeight = window.innerHeight;
    
    if(!envWidth  || envWidth  === 0) envWidth  = document.documentElement.clientWidth;
    if(!envHeight || envHeight === 0) envHeight = document.documentElement.clientHeight;
    
    if (!KAPhy.Canvas.configured) {
      console.warn("KAPhy warning - Attempted to resize when not configured");
      return;
    }

    KAPhy.Canvas.relWidth = relWidth;
    KAPhy.Canvas.relHeight = relHeight;

    if (envWidth / envHeight < relWidth / relHeight) {
      KAPhy.Canvas.element.width = envWidth;
      KAPhy.Canvas.element.height = relHeight / relWidth * envWidth;
    } else {
      KAPhy.Canvas.element.width = relWidth / relHeight * envHeight;
      KAPhy.Canvas.element.height = envHeight;
    }
  };
}
