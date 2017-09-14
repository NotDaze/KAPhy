if(!KAPhy.Draw) {
  var CENTER = "CENTER";
  var CORNER = "CORNER";
  var RADIUS = "RADIUS";
  var CORNERS = "CORNERS";
  
  var MITER = "miter";
  var ROUND = "round";
  var BEVEL = "bevel";
  var SQUARE = "butt";
  var PROJECT = "square";
  
  var START = "start";
  var END = "end";
  var LEFT = "left";
  var RIGHT = "right";
  var CENTER = "center";
  
  var TOP = "top";
  var BOTTOM = "bottom";
  var MIDDLE = "middle";
  var ALPHABETIC = "alphabetic";
  var HANGING = "hanging";
  
  KAPhy.Draw = {
    currentRectMode: "CORNER",
    currentImageMode: "CORNER",
    currentEllipseMode: "CENTER",
    currentTextLineSpacing: 0.4,
    
    shapeOpen: false,
  };
}
