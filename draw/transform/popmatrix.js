if(!KAPhy.Draw.popMatrix) {
  KAPhy.Draw.popMatrix = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You cannot use transformation commands in shape mode.");
      return;
    }
    
    var oldFillStyle    = KAPhy.Canvas.context.fillStyle;
    var oldStrokeStyle  = KAPhy.Canvas.context.strokeStyle;
    var oldLineWidth    = KAPhy.Canvas.context.lineWidth;
    var oldLineCap      = KAPhy.Canvas.context.lineCap;
    var oldLineJoin     = KAPhy.Canvas.context.lineJoin;
    var oldGlobalAlpha  = KAPhy.Canvas.context.globalAlpha;
    var oldMiterLimit   = KAPhy.Canvas.context.miterLimit;
    var oldFont         = KAPhy.Canvas.context.font;
    var oldTextAlign    = KAPhy.Canvas.context.textAlign;
    var oldTextBaseline = KAPhy.Canvas.context.textBaseline;
    var oldSmoothing    = KAPhy.Canvas.context.imageSmoothingEnabled;
    
    KAPhy.Canvas.context.restore();
    
    KAPhy.Canvas.context.fillStyle    = oldFillStyle;
    KAPhy.Canvas.context.strokeStyle  = oldStrokeStyle;
    KAPhy.Canvas.context.lineWidth    = oldLineWidth;
    KAPhy.Canvas.context.lineCap      = oldLineCap;
    KAPhy.Canvas.context.lineJoin     = oldLineJoin;
    KAPhy.Canvas.context.globalAlpha  = oldGlobalAlpha;
    KAPhy.Canvas.context.miterLimit   = oldMiterLimit;
    KAPhy.Canvas.context.font         = oldFont;
    KAPhy.Canvas.context.textAlign    = oldTextAlign;
    KAPhy.Canvas.context.textBaseline = oldTextBaseline;
    KAPhy.Canvas.context.imageSmoothingEnabled = oldSmoothing;
  };
}
