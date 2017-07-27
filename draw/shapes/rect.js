Draw.rect = function(x, y, w, h) {
  Canvas.context.beginPath();
  switch(Draw.currentRectMode) {
    case CORNER: Canvas.context.fillRect(x, y, w, h);
                 Canvas.context.strokeRect(x, y, w, h); break;
    case CORNERS: Canvas.context.fillRect(x, y, w - x, h - y);
                 Canvas.context.strokeRect(x, y, w - x, h - y); break;
    case RADIUS: Canvas.context.fillRect(x + w/2, y + h/2, w * 2, h * 2);
                 Canvas.context.strokeRect(x + w/2, y + h/2, w * 2, h * 2); break;
    case CENTER: Canvas.context.fillRect(x + w/2, y + h/2, w, h);
                 Canvas.context.strokeRect(x + w/2, y + h/2, w, h); break;
  }
  Canvas.context.fill();
  Canvas.context.stroke();
};
