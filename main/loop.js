if(!KAPhy.loop) {
  KAPhy.loop = function(loopedFunction) {
    if(loopedFunction) { 
      if(KAPhy.loopedFunctionInterval) {
        clearInterval(KAPhy.loopedFunctionInterval);
      }
      KAPhy.loopedFunction = loopedFunction;
      KAPhy.loopedFunctionInterval = setInterval(function() {
        KAPhy.loopedFunction();
        
        KAPhy.Canvas.update();
      }, 1000/KAPhy.loopedFunctionFrameRate);
    }
  };
}
if(!KAPhy.noLoop) {
  KAPhy.noLoop = function() {
    if(KAPhy.loopedFunction) { 
      clearInterval(KAPhy.loopedFunctionInterval);
      KAPhy.loopedFunction = null;
    }
  };
}
if(!KAPhy.frameRate) {
  KAPhy.frameRate = function(newFrameRate) {
    KAPhy.loopedFunctionFrameRate = newFrameRate || 60;
    if(KAPhy.loopedFunction) {
      clearInterval(KAPhy.loopedFunctionInterval);
      KAPhy.loopedFunctionInterval = setInterval(function() {
        KAPhy.loopedFunction();
        
        KAPhy.Canvas.update();
      }, 1000/KAPhy.loopedFunctionFrameRate);
    }
  };
}