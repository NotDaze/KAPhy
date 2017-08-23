if (!KAPhy.Canvas.deconfigure) {
  KAPhy.Canvas.deconfigure = function(canvasElement) {
    if (!this.configured) {
      console.warn("KAPhy warning - Attempted to reconfigure canvas.");
      return;
    }
    
    KAPhy.Canvas.element.onmousemove = null;
    KAPhy.Canvas.element.onmousedown = null;
    KAPhy.Canvas.element.onmouseup = null;
    KAPhy.Canvas.element.onmouseout = null;
    KAPhy.Canvas.element.onmouseover = null;
    KAPhy.Canvas.element = null;
    KAPhy.Canvas.configured = false;
    
    window.onkeydown = null;
    window.onkeyup = null;
    KAPhy.Canvas.lastKeyUp = null;
    KAPhy.Canvas.lastKeyDown = null;
    KAPhy.Canvas.keyIsPressed = null;
    KAPhy.Canvas.keys = null;

    KAPhy.Canvas.relWidth = null;
    KAPhy.Canvas.relHeight = null;

    KAPhy.Canvas.context = null;
    
    KAPhy.Canvas.mouseX = null;
    KAPhy.Canvas.mouseY = null;
    KAPhy.Canvas.mouseIsPressed = null;
    KAPhy.Canvas.pmouseIsPressed = null;
  };
}
