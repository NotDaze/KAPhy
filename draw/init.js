if(!Draw || KAPhy.version !== KAPhy.current) {
  var CENTER = "CENTER";
  var CORNER = "CORNER";
  var RADIUS = "RADIUS";
  var CORNERS = "CORNERS";
  
  var MITER = "miter";
  var ROUND = "round";
  var BEVEL = "bevel";
  
  var Draw = {
    currentRectMode: "CORNER",
    currentImageMode: "CORNER",
    currentEllipseMode: "CENTER",
    
    shapeOpen: false,
  };
}
