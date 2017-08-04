if (!Canvas.configure || KAPhy.version !== KAPhy.current) {
  Canvas.configure = function(canvasElement) {
    if (this.configured) {
      console.warn("KAPhy Warning - Please deconfigure canvas before reconfiguring it.");
      return;
    }

    Canvas.element = canvasElement;
    Canvas.configured = true;

    Canvas.relWidth = canvasElement.width;
    Canvas.relHeight = canvasElement.height;

    Canvas.context = canvasElement.getContext("2d");
    Canvas.context.fillStyle = "rgba(255, 255, 255, 1.0)";
    
    Canvas.pmouseX = 0;
    Canvas.pmouseY = 0;
    Canvas.mouseX = 0;
    Canvas.mouseY = 0;
    
    Canvas.mouseIsPressed = false;
    
    Canvas.keys = {};
    Canvas.keyIsPressed = false;
    Canvas.lastKeyTriggered = null;
    Canvas.lastKeyEvent = null;
    
    Canvas.element.onmousemove = function(e) {
      var canvasBoundingRect = Canvas.element.getBoundingClientRect();
      Canvas.pmouseX = Canvas.mouseX;
      Canvas.pmouseY = Canvas.mouseY;
      Canvas.mouseX = Math.round(Canvas.toCanvasUnits(e.clientX - canvasBoundingRect.left));
      Canvas.mouseY = Math.round(Canvas.toCanvasUnits(e.clientY - canvasBoundingRect.top));
      
      if(Canvas.mouseMoved) {
        Canvas.mouseMoved();
      }
      if(Canvas.mouseIsPressed && Canvas.mouseDragged) {
        Canvas.mouseDragged();
      }
    };
    Canvas.element.onmousedown = function() {
      Canvas.mouseIsPressed = true;
      
      if(Canvas.mousePressed) { Canvas.mousePressed(); }
    };
    Canvas.element.onmouseup = function() {
      Canvas.mouseIsPressed = false;
      
      if(Canvas.mouseClicked) { Canvas.mouseClicked(); }
      if(Canvas.mouseReleased) { Canvas.mouseReleased(); }//These are exactly the same in PJS...
    };
    Canvas.element.onmouseout = function() {
      if(Canvas.mouseOut) { Canvas.mouseOut(); }
    };
    Canvas.element.onmouseover = function() {
      if(Canvas.mouseOver) { Canvas.mouseOver(); }
    };
    
    window.onkeydown = function(e) {
      if(Canvas.keys[e.key.toLowerCase()]) { return; }
      
      Canvas.keys[e.key.toLowerCase()] = true;
      
      Canvas.keyIsPressed = true;
      Canvas.lastKeyDown = e.key.toLowerCase();
      
      if(Canvas.keyPressed) { Canvas.keyPressed(); }
    };
    
    window.onkeyup = function(e) {
      if(!Canvas.keys[e.key.toLowerCase()]) { return; }
      
      Canvas.keys[e.key.toLowerCase()] = false;
      
      Canvas.lastKeyUp = e.key.toLowerCase();
      
      var scopeChanger = function() {
        for(var i in Canvas.keys) {
          if(Canvas.keys[i]) {
            return;
          }
        }
        Canvas.keyIsPressed = false;
      }();
      
      if(Canvas.keyReleased) { Canvas.keyReleased(); }
      if(Canvas.keyTyped) { Canvas.keyTyped(); }//These are exactly the same too, lol
    };
  };
}
