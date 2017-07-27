if (!Canvas.resize) {
  Canvas.resize = function(relWidth, relHeight) {
    if (!Canvas.configured) {
      console.warn("KAPhy warning - Attempted to resize when not configured");
      return;
    }

    Canvas.relWidth = relWidth;
    Canvas.relHeight = relHeight;

    if (window.innerWidth / window.innerHeight < relWidth / relHeight) {
      Canvas.element.width = window.innerWidth;
      Canvas.element.height = relHeight / relWidth * window.innerWidth;
    } else {
      Canvas.element.width = relWidth / relHeight * window.innerHeight;
      Canvas.element.height = window.innerHeight;
    }
  };
}
