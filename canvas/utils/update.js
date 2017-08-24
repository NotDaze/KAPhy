if(!KAPhy.Canvas.update) {
  KAPhy.Canvas.update = function() {
    if(!this.configured) {
      return;
    }
    
    KAPhy.Canvas.pmouseIsPressed = KAPhy.Canvas.mouseIsPressed;
    KAPhy.Canvas.pmouseX = KAPhy.Canvas.mouseX;
    KAPhy.Canvas.pmouseY = KAPhy.Canvas.mouseY;
    
    if(!KAPhy.Canvas.mouseIsPressed) KAPhy.Interface.selected = null;
  };
}