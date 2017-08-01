if(!Draw.loadFontSet) {
  Draw.loadFontSet = function(fonts, onFinish) {
    var fontsLoaded = 0;
    for(var i = 0; i < fonts.length; i++) {
      var newLink = document.createElement("link");
    
      newLink.rel = "stylesheet";
      newLink.href = "https://fonts.googleapis.com/css?family=" + font;
    
      newLink.onload = function() {
        fontsLoaded++;
        if(fontsLoaded >= fonts.length - 1) {
          if (onFinish) onFinish();
        }
      };
    
      document.head.appendChild(newLink);
    }
  };
}
