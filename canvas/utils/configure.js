if (!KAPhy.Canvas.configure) {
  KAPhy.Canvas.configure = function(canvasElement) {
    if (this.configured) {
      console.warn("KAPhy Warning - Please deconfigure canvas before reconfiguring it.");
      return;
    }

    KAPhy.Canvas.element = canvasElement;
    KAPhy.Canvas.configured = true;

    KAPhy.Canvas.relWidth = canvasElement.width;
    KAPhy.Canvas.relHeight = canvasElement.height;

    KAPhy.Canvas.context = canvasElement.getContext("2d");
    KAPhy.Canvas.context.fillStyle = "rgba(255, 255, 255, 1.0)";
    
    KAPhy.Canvas.pmouseX = 0;
    KAPhy.Canvas.pmouseY = 0;
    KAPhy.Canvas.mouseX = 0;
    KAPhy.Canvas.mouseY = 0;
    
    KAPhy.Canvas.mouseIsPressed = false;
    KAPhy.Canvas.pmouseIsPressed = false;
    
    KAPhy.Canvas.keys = {};
    KAPhy.Canvas.keyIsPressed = false;
    KAPhy.Canvas.lastKeyTriggered = null;
    KAPhy.Canvas.lastKeyEvent = null;
    
    KAPhy.Canvas.element.onmousemove = function(e) {
      var canvasBoundingRect = KAPhy.Canvas.element.getBoundingClientRect();
      KAPhy.Canvas.mouseX = Math.round(KAPhy.Canvas.toCanvasUnits(e.clientX - canvasBoundingRect.left));
      KAPhy.Canvas.mouseY = Math.round(KAPhy.Canvas.toCanvasUnits(e.clientY - canvasBoundingRect.top));
      
      if(KAPhy.Canvas.mouseMoved) {
        KAPhy.Canvas.mouseMoved();
      }
      if(KAPhy.Canvas.mouseIsPressed && KAPhy.Canvas.mouseDragged) {
        KAPhy.Canvas.mouseDragged();
      }
    };
    KAPhy.Canvas.element.onmousedown = function() {
      KAPhy.Canvas.mouseIsPressed = true;
      
      if(KAPhy.Canvas.mousePressed) { KAPhy.Canvas.mousePressed(); }
    };
    KAPhy.Canvas.element.onmouseup = function() {
      KAPhy.Canvas.mouseIsPressed = false;
      
      if(KAPhy.Canvas.mouseClicked) { KAPhy.Canvas.mouseClicked(); }
      if(KAPhy.Canvas.mouseReleased) { KAPhy.Canvas.mouseReleased(); }//These are exactly the same in PJS...
    };
    KAPhy.Canvas.element.onmouseout = function() {
      if(KAPhy.Canvas.mouseOut) { KAPhy.Canvas.mouseOut(); }
    };
    KAPhy.Canvas.element.onmouseover = function() {
      if(KAPhy.Canvas.mouseOver) { KAPhy.Canvas.mouseOver(); }
    };
    
    window.onkeydown = function(e) {
      if(KAPhy.Canvas.keys[e.key.toLowerCase()]) { return; }
      
      KAPhy.Canvas.keys[e.key.toLowerCase()] = true;
      
      KAPhy.Canvas.keyIsPressed = true;
      KAPhy.Canvas.lastKeyDown = e.key.toLowerCase();
      
      if(KAPhy.Canvas.keyPressed) { KAPhy.Canvas.keyPressed(); }
    };
    
    window.onkeyup = function(e) {
      if(!KAPhy.Canvas.keys[e.key.toLowerCase()]) { return; }
      
      KAPhy.Canvas.keys[e.key.toLowerCase()] = false;
      
      KAPhy.Canvas.lastKeyUp = e.key.toLowerCase();
      
      var scopeChanger = function() {
        for(var i in KAPhy.Canvas.keys) {
          if(KAPhy.Canvas.keys[i]) {
            return;
          }
        }
        KAPhy.Canvas.keyIsPressed = false;
      }();
      
      if(KAPhy.Canvas.keyReleased) { KAPhy.Canvas.keyReleased(); }
      if(KAPhy.Canvas.keyTyped) { KAPhy.Canvas.keyTyped(); }//These are exactly the same too, lol
    };
  };
}
