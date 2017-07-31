var filesToLoad = [
  "canvas/init.js",
  "canvas/utils/configure.js",
  "canvas/utils/deconfigure.js",
  "canvas/utils/resize.js",
  "canvas/utils/coordinates.js",
  "draw/init.js",
  "draw/colors/fill.js",
  "draw/colors/stroke.js",
  "draw/colors/nostroke.js",
  "draw/colors/nofill.js",
  "draw/colors/getfill.js",
  "draw/colors/getstroke.js",
  "draw/settings/strokeweight.js",
  "draw/settings/getstrokeweight.js",
  "draw/settings/rectmode.js",
  "draw/settings/ellipsemode.js",
  "draw/settings/imagemode.js",
  "draw/settings/getrectmode.js",
  "draw/settings/getellipsemode.js",
  "draw/settings/getimagemode.js",
  "draw/settings/strokejoin.js",
  "draw/settings/strokecap.js",
  "draw/settings/getstrokejoin.js",
  "draw/settings/getstrokecap.js",
  "draw/settings/textfont.js",
  "draw/settings/gettextfont.js",
  "draw/settings/textsize.js",
  "draw/settings/gettextsize.js",
  "draw/transform/popmatrix.js",
  "draw/transform/pushmatrix.js",
  "draw/transform/resetmatrix.js",
  "draw/transform/rotate.js",
  "draw/transform/scale.js",
  "draw/transform/skew.js",
  "draw/transform/translate.js",
  "draw/shapes/arc.js",
  "draw/shapes/background.js",
  "draw/shapes/beginshape.js",
  "draw/shapes/beziervertex.js",
  "draw/shapes/ellipse.js",
  "draw/shapes/endshape.js",
  "draw/shapes/line.js",
  "draw/shapes/point.js",
  "draw/shapes/poly.js",
  "draw/shapes/quadvertex.js",
  "draw/shapes/rect.js",
  "draw/shapes/text.js",
  "draw/shapes/vertex.js",
  "draw/image/images.js",
  "draw/image/loadimage.js",
  "draw/image/loadimageset.js",
  "draw/image/image.js",
  "draw/image/get.js",
  "physics/init.js",
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
];

function load(onFinish, override) {
  if(KAPhy.version === KAPhy.current) {
    if(onFinish) onFinish();
    return;
  }
  
  function importJS(filename, onLoad) {
    var newScript = document.createElement("script");

    newScript.type = "text/javascript";
    newScript.src = "https://rawgit.com/TemporalFuzz/KAPhy/master/" + filename;

    newScript.onload = onLoad;

    document.head.appendChild(newScript);
  }

  var i = 0;
  function loadNext() {
    i++;
    console.log((i + 1) + " files loaded!");
    if (i >= filesToLoad.length) {
      KAPhy.finishUpdate();
      if (onFinish) onFinish();
      return;
    }
    importJS(filesToLoad[i], loadNext);
  };
  importJS(filesToLoad[i], loadNext);
}
