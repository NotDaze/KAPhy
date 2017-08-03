if (!Canvas.deconfigure || KAPhy.version !== KAPhy.current) {
  Canvas.deconfigure = function(canvasElement) {
    if (!this.configured) {
      console.warn("KAPhy warning - Attempted to reconfigure canvas.");
      return;
    }
    
    Canvas.element.onmousemove = null;
    Canvas.element.onmousedown = null;
    Canvas.element.onmouseup = null;
    Canvas.element.onmouseout = null;
    Canvas.element.onmouseover = null;
    Canvas.element = null;
    Canvas.configured = false;
    
    window.onkeydown = null;
    window.onkeyup = null;
    Canvas.lastKeyUp = null;
    Canvas.lastKeyDown = null;
    Canvas.keyIsPressed = null;
    Canvas.keys = null;

    Canvas.relWidth = null;
    Canvas.relHeight = null;

    Canvas.context = null;
    
    Canvas.mouseX = null;
    Canvas.mouseY = null;
    Canvas.mouseIsPressed = null;
  };
}
