if(!KAPhy.Draw.loadFont) {
  KAPhy.Draw.loadFont = function(font, onLoad) {
    var newLink = document.createElement("link");
    
    newLink.rel = "stylesheet";
    newLink.href = "https://fonts.googleapis.com/css?family=" + font;
    
    newLink.onload = onLoad;
    
    document.head.appendChild(newLink);
  };
}
