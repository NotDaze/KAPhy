if(!Draw.popMatrix) {
  Draw.popMatrix = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var oldFillStyle    = Canvas.context.fillStyle;
    var oldStrokeStyle  = Canvas.context.strokeStyle;
    var oldLineWidth    = Canvas.context.lineWidth;
    var oldLineCap      = Canvas.context.lineCap;
    var oldLineJoin     = Canvas.context.lineJoin;
    var oldGlobalAlpha  = Canvas.context.globalAlpha;
    var oldMiterLimit   = Canvas.context.miterLimit;
    var oldFont         = Canvas.context.font;
    var oldTextAlign    = Canvas.context.textAlign;
    var oldTextBaseline = Canvas.context.textBaseline;
    var oldSmoothing    = Canvas.context.imageSmoothingEnabled;
    
    Canvas.context.restore();
    
    Canvas.context.fillStyle    = oldFillStyle;
    Canvas.context.strokeStyle  = oldStrokeStyle;
    Canvas.context.lineWidth    = oldLineWidth;
    Canvas.context.lineCap      = oldLineCap;
    Canvas.context.lineJoin     = oldLineJoin;
    Canvas.context.globalAlpha  = oldGlobalAlpha;
    Canvas.context.miterLimit   = oldMiterLimit;
    Canvas.context.font         = oldFont;
    Canvas.context.textAlign    = oldTextAlign;
    Canvas.context.textBaseline = oldTextBaseline;
    Canvas.context.imageSmoothingEnabled = oldSmoothing;
  };
}
