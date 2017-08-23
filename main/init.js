var KAPhy = {
  loaded: false,
  loopedFunction: null,
  loopedFunctionInterval: null,
  loopedFunctionFrameRate: 60
};


var fileSets = [
  [
    "canvas/init.js",
    "draw/init.js",
    "physics/init.js",
    "canvas/animation/main.js",
    "main/importka.js",
    "main/loop.js",
    "ui/init.js",
  ],
  [
    "canvas/animation/core.js",
    "canvas/animation/animset.js",
    "canvas/utils/configure.js",
    "canvas/utils/deconfigure.js",
    "canvas/utils/resize.js",
    "canvas/utils/update.js",
    "canvas/utils/coordinates.js",
    "physics/minilibs/equation.js",
    "physics/minilibs/vector2/init.js",
    "physics/minilibs/collisiondetection.js",
    "ui/basic.js",
    "ui/updateset.js"
  ],
  [
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
    "draw/settings/gettextalign.js",
    "draw/settings/gettextbaseline.js",
    "draw/settings/textalign.js",
    "draw/settings/loadfont.js",
    "draw/settings/loadfontset.js",
    "draw/settings/textlinespacing.js",
    "draw/settings/gettextlinespacing.js",
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
    "physics/minilibs/vector2/arithmetic.js",
    "physics/minilibs/vector2/convert.js",
    "physics/minilibs/vector2/direction.js",
    "physics/minilibs/vector2/dot.js",
    "physics/minilibs/vector2/magnitude.js",
    "physics/minilibs/vector2/reflect.js",
    "physics/minilibs/vector2/canvasmap.js",
    "ui/rectbasic.js",
    "ui/ellipsebasic.js"
  ],
  [
    "physics/entities/circle/init.js",
    "physics/entities/line.js",
    "physics/entities/constraints/constraint.js",
    "ui/rectbutton.js",
    "ui/ellipsebutton.js"
  ],
  [
    "physics/entities/constraints/bungee.js",
    "physics/entities/constraints/compressor.js",
    "physics/entities/constraints/cord.js",
    "physics/entities/constraints/extender.js",
    "physics/entities/constraints/rod.js",
    "physics/entities/constraints/spring.js",
    "physics/entities/circle/core.js",
    "physics/entities/circle/force.js",
    "physics/entities/circle/collideline.js",
    "physics/entities/circle/collidecircle.js",
    "ui/rectdragger.js",
    "ui/ellipsedragger.js"
  ]
];

KAPhy.load = function(onComplete) {
  if(KAPhy.loaded) { return; }
  
  KAPhy.loaded = true;
  
  function importJS(filename, onLoad) {
    var newScript = document.createElement("script");

    newScript.type = "text/javascript";
    //newScript.src = "https://rawgit.com/TemporalFuzz/KAPhy/master/" + filename;
    newScript.src = "./" + filename;

    newScript.onload = onLoad;

    document.head.appendChild(newScript);
  }
  
  function importSetJS(fileset, onFinish) {
    var filesLoaded = 0;
    
    for(var i = 0; i < fileset.length; i++) {
      importJS(fileset[i], function() {
        filesLoaded++;
        if(filesLoaded >= fileset.length) {
          if(onFinish) { onFinish(); }
          return;
        }
      });
    }
  }

  var i = 0;
  function loadNext() {
    i++;
    if (i >= fileSets.length) {
      if (onComplete) { onComplete(); }
      return;
    } else {
      importSetJS(fileSets[i], loadNext);
    }
  };
  importSetJS(fileSets[i], loadNext);
}
