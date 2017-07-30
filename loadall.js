var filesToLoad = [
  "kaphy.js",
  "canvas/init.js",
  "canvas/utils/configure.js",
  "canvas/utils/deconfigure.js",
  "canvas/utils/resize.js",
  "canvas/utils/coordinates.js",
  "draw/init.js",
  "draw/colors/fill.js",
  "draw/colors/stroke.js",
  "draw/colors/nostroke.js",
  "draw/colors/getfill.js",
  "draw/colors/getstroke.js",
  "draw/settings/strokeweight.js",
  "draw/settings/getstrokeweight.js",
  "draw/settings/rectmode.js",
  "draw/settings/ellipsemode.js",
  "draw/settings/imagemode.js",
  "draw/settings/textfont.js",
  "draw/shapes/arc.js",
  "draw/shapes/beginshape.js",
  "draw/shapes/beziervertex.js",
  "draw/shapes/ellipse.js",
  "draw/shapes/endshape.js",
  "draw/shapes/line.js",
  "draw/shapes/point.js",
  "draw/shapes/poly.js",
  "draw/shapes/quadvertex.js",
  "draw/shapes/rect.js",
  "draw/shapes/vertex.js",
  "draw/image/images.js",
  "draw/image/loadimage.js",
  "draw/image/loadimageset.js",
  "draw/image/image.js",
  "draw/image/get.js",
  "physics/minilibs/equation.js",
  "physics/minilibs/vector2.js",
  "physics/minilibs/collisiondetection.js",
  "physics/entities/circle.js",
  "physics/entities/line.js",
  "physics/entities/constraints/constraint.js",
  "physics/entities/constraints/bungee.js",
  "physics/entities/constraints/compressor.js",
  "physics/entities/constraints/cord.js",
  "physics/entities/constraints/extender.js",
  "physics/entities/constraints/rod.js",
  "physics/entities/constraints/spring.js",
  "kaphyfinish.js"
];

function importJS(filename) {
  var newScript = document.createElement("script");
  
  newScript.type = "text/javascript";
  newScript.src = "https://rawgit.com/TemporalFuzz/KAPhy/master/" + filename;
  
  document.head.appendChild(newScript);
}

for(var i = 0; i < filesToLoad.length; i++) {
  importJS(filesToLoad[i]);
}
