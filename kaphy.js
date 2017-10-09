var KAPhy = {
  loaded: true,
  loopedFunction: null,
  loopedFunctionInterval: null,
  loopedFunctionFrameRate: 60,
  Canvas: {
    configured: false,
    relWidth: null,
    relHeight: null,
    element: null,
    context: null
  },
  Draw: {
    currentRectMode: "CORNER",
    currentImageMode: "CORNER",
    currentEllipseMode: "CENTER",
    currentTextLineSpacing: 0.4,
    shapeOpen: false
  },
  Physics: {
    airResistance: 0.99, //The velocity of everything is multiplied by this number each frame.
    airResistanceSleeping: 0.9, //The air resistance of something that is "asleep".
    gravityForce: 0.7, //The magnitude of gravity
    constraintAdjustment: 0.3, //How much rigid constraints adjust their nodes' positions.sleepThreshold: 2,//Maximum velocity at which any circle can be "asleep".
    circleAdjustment: 0.3 //The intensity of the position adjustment when circles collide
  },
  Interface: {
    selected: null
  }
};

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
/** Main **/
if(!KAPhy.Canvas.Animation) {
  KAPhy.Canvas.Animation = function(config, looped) {
    if(config.transition) {
      if(!KAPhy.Canvas.Animation.transitions[config.transition]) {
        console.warn("KAPhy Warning - Invalid animation transition specified. Defaulted to linear.");
        config.transition = "linear";
      }
    }
    
    this.duration = config.duration || 1000;
    this.startTime = new Date().getTime();
    
    this.startValue = config.start || 0;
    this.finalValue = (config.final === 0 ? 0 : (config.end === 0 ? 0 : (config.end || (config.final || 1))));
    
    this.transition = config.transition || "linear";
    
    this.looped = looped || false;
  };
  KAPhy.Canvas.Animation.transitions = {
    linear: function(x) { return x; },
    easeInSine: function(x) { return -Math.sin((x + 1) * Math.PI/2) + 1; },
    easeOutSine: function(x) { return Math.sin(x * Math.PI/2); },
    easeInOutSine: function(x) { return Math.sin((x - 0.5) * Math.PI)/2 + 0.5; },
    easeInQuad: function(x) { return x * x; },
    easeOutQuad: function(x) { return x * (2 - x); },
    easeInOutQuad: function(x) { return x < 0.5 ? (2 * x * x) : (-2 * (--x) * x + 1); },
    easeInCubic: function(x) { return x * x * x; },
    easeOutCubic: function(x) { x--; return x * x * x + 1; },
    easeInOutCubic: function(x) { return x < 0.5 ? (4 * x * x * x) : (4 * (--x) * x * x + 1); },
    easeInQuart: function(x) { return x * x * x * x; },
    easeOutQuart: function(x) { x--; return -x * x * x * x + 1; },
    easeInOutQuart: function(x) { return x < 0.5 ? (8 * x * x * x * x) : (8 * (x - 1) * (x - 1) * (x - 1) * (x - 1) + 1); },
    easeInQuint: function(x) { return x * x * x * x * x; },
    easeOutQuint: function(x) { x--; return x * x * x * x * x + 1; },
    easeInOutQuint: function(x) { return x < 0.5 ? (16 * x * x * x * x * x) : (16 * (--x) * x * x * x * x + 1); },
  };
}

/** AnimationSet **/
if(!KAPhy.Canvas.AnimationSet) {
  KAPhy.Canvas.AnimationSet = function(info, looped) {
    this.animInfo = info.slice();
    
    this.looped = looped || false;
    
    if(this.looped) {
      this.animInfoBackup = this.animInfo.slice();
    }
    
    this.currentAnimation = new KAPhy.Canvas.Animation(this.animInfo.shift());
  };
}
if(!KAPhy.Canvas.AnimationSet.prototype.getValue) {
  KAPhy.Canvas.AnimationSet.prototype.getValue = function() {
    while(this.currentAnimation.isExpired()) {
      if(this.animInfo.length !== 0) {
        this.currentAnimation = new KAPhy.Canvas.Animation(this.animInfo.shift());
      } else if (this.looped) {
        this.animInfo = this.animInfoBackup.slice();
        this.currentAnimation = new KAPhy.Canvas.Animation(this.animInfo.shift());
      }
    }
    
    return this.currentAnimation.getValue();
  };
}
if(!KAPhy.Canvas.AnimationSet.prototype.isExpired) {
  KAPhy.Canvas.AnimationSet.prototype.isExpired = function() {
    if(this.animInfo.length === 0 && !this.looped) {
      return this.currentAnimation.isExpired();
    }
    return false;
  };
}

/** Core **/
if(!KAPhy.Canvas.Animation.getValue) {
  KAPhy.Canvas.Animation.getValue = function(data) {
    var now = new Date().getTime();
    var startTime = data.startTime;
    var duration = data.duration;
    
    var startVal = data.startValue;
    var endValue = data.finalValue;
    
    var stage;
    
    if(data.looped) {
      stage = KAPhy.Canvas.Animation.transitions[data.transition](
        ((now - startTime)/duration) % 1
      );
    }
    else {
      stage = KAPhy.Canvas.Animation.transitions[data.transition](
        ((now - startTime)/duration)
      );
      
      if(stage < 0) return startValue;
      if(stage > 1) return finalValue;
    }
    
    return (startValue + (finalValue - startValue) * stage);
  };
}
if(!KAPhy.Canvas.Animation.prototype.getValue) {
  KAPhy.Canvas.Animation.prototype.getValue = function() {
    return KAPhy.Canvas.Animation.getValue(this);
  };
}
if(!KAPhy.Canvas.Animation.prototype.isExpired) {
  KAPhy.Canvas.Animation.prototype.isExpired = function() {
    return ((new Date().getTime() - this.startTime) >= this.duration);
  };
}
if(!KAPhy.ImportKA) {
  KAPhy.ImportKA = function(id, onLoad) {
    function read(raw) {
      var data = JSON.parse(raw.revision.code);
      onLoad(data);
    }
    
    var jsonReader = document.createElement("script");
    jsonReader.setAttribute("src","https://www.khanacademy.org/api/labs/scratchpads/" + id + "?callback=read&\x5f=" + Date.now());
    document.body.appendChild(jsonReader);
  };
}
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
if(!KAPhy.Interface.Basic) {
  KAPhy.Interface.Basic = function(config) {
    this.pos = config.pos || new KAPhy.Physics.Vector2(config.x || 0, config.y || 0);
    
    this.width = config.width || config.w || config.size || 100;
    this.height = config.height || config.h || config.size || 100;
  };
  KAPhy.Interface.Basic.prototype.down = function() {
    return this.mouseOver() && KAPhy.Canvas.mouseIsPressed;
  };
  KAPhy.Interface.Basic.prototype.pressed = function() {
    return this.mouseOver() && KAPhy.Canvas.mouseIsPressed && !KAPhy.Canvas.pmouseIsPressed;
  };
  KAPhy.Interface.Basic.prototype.released = function() {
    return this.mouseOver() && KAPhy.Canvas.pmouseIsPressed && !KAPhy.Canvas.mouseIsPressed;
  };
  KAPhy.Interface.Basic.prototype.select = function() {
    if(this.down() && !KAPhy.Interface.selected) {
      KAPhy.Interface.selected = this;
    }
  };
  KAPhy.Interface.Basic.prototype.display = function() {
    this.select();
    if(this.update) this.update();
    if(this.drag) this.drag();
  };
}
if(!KAPhy.Interface.EllipseBasic) {
  KAPhy.Interface.EllipseBasic = function(config) {
    KAPhy.Interface.Basic.call(this, config);
  };
  KAPhy.Interface.EllipseBasic.prototype = Object.create(KAPhy.Interface.Basic.prototype);
  KAPhy.Interface.EllipseBasic.prototype.mouseOver = function() {
    return Math.sqrt((KAPhy.Canvas.mouseX - this.pos.x) * (KAPhy.Canvas.mouseX - this.pos.x) * this.height/this.width * this.height/this.width +
                     (KAPhy.Canvas.mouseY - this.pos.y) * (KAPhy.Canvas.mouseY - this.pos.y)) < this.height/2;
  };
  KAPhy.Interface.EllipseBasic.prototype.pmouseOver = function() {
    return Math.sqrt((KAPhy.Canvas.pmouseX - this.pos.x) * (KAPhy.Canvas.pmouseX - this.pos.x) * this.height/this.width * this.height/this.width +
                     (KAPhy.Canvas.pmouseY - this.pos.y) * (KAPhy.Canvas.pmouseY - this.pos.y)) < this.height/2;
  };
  KAPhy.Interface.EllipseBasic.prototype.draw = function() {
    KAPhy.Draw.ellipse(this.pos.x, this.pos.y, this.width, this.height);
  };
}
if(!KAPhy.Interface.EllipseButton) {
  KAPhy.Interface.EllipseButton = function(config) {
    KAPhy.Interface.EllipseBasic.call(this, config);
    
    this.onHold = config.onHold || function() {};
    this.onHover = config.onHover || function() {};
    this.onPress = config.onPress || function() {};
    this.onRelease = config.onRelease || function() {};
  };
  KAPhy.Interface.EllipseButton.prototype = Object.create(KAPhy.Interface.EllipseBasic.prototype);
  KAPhy.Interface.EllipseButton.prototype.update = function() {
    if(this.mouseOver()) this.onHover();
    if(this.down()) this.onHold();
    if(this.pressed()) this.onPress();
    if(this.released()) this.onRelease();
  };
}
if(!KAPhy.Interface.EllipseDragger) {
  KAPhy.Interface.EllipseDragger = function(config) {
    KAPhy.Interface.EllipseButton.call(this, config);
    
    this.onMove = config.onMove || function() {};
  };
  KAPhy.Interface.EllipseDragger.prototype = Object.create(KAPhy.Interface.EllipseButton.prototype);
  KAPhy.Interface.EllipseDragger.prototype.drag = function() {
    if(KAPhy.Interface.selected === this) {
      if(KAPhy.Canvas.pmouseX !== KAPhy.Canvas.mouseX ||
         KAPhy.Canvas.pmouseY !== KAPhy.Canvas.mouseY) {
        this.pos.x += KAPhy.Canvas.mouseX - KAPhy.Canvas.pmouseX;
        this.pos.y += KAPhy.Canvas.mouseY - KAPhy.Canvas.pmouseY;
        
        this.onMove();
      }
    }
  };
}

if(!KAPhy.Interface.RectBasic) {
  KAPhy.Interface.RectBasic = function(config) {
    KAPhy.Interface.Basic.call(this, config);
  };
  KAPhy.Interface.RectBasic.prototype = Object.create(KAPhy.Interface.Basic.prototype);
  KAPhy.Interface.RectBasic.prototype.mouseOver = function() {
    return KAPhy.Canvas.mouseX >= this.pos.x && 
           KAPhy.Canvas.mouseY >= this.pos.y && 
           KAPhy.Canvas.mouseX <= this.pos.x + this.width &&
           KAPhy.Canvas.mouseY <= this.pos.y + this.height;
  };
  KAPhy.Interface.RectBasic.prototype.pmouseOver = function() {
    return KAPhy.Canvas.pmouseX >= this.pos.x && 
           KAPhy.Canvas.pmouseY >= this.pos.y && 
           KAPhy.Canvas.pmouseX <= this.pos.x + this.width &&
           KAPhy.Canvas.pmouseY <= this.pos.y + this.height;
  };
  KAPhy.Interface.RectBasic.prototype.draw = function() {
    KAPhy.Draw.rect(this.pos.x, this.pos.y, this.width, this.height);
  };
}
if(!KAPhy.Interface.RectButton) {
  KAPhy.Interface.RectButton = function(config) {
    KAPhy.Interface.RectBasic.call(this, config);
    
    this.onHold = config.onHold || function() {};
    this.onHover = config.onHover || function() {};
    this.onPress = config.onPress || function() {};
    this.onRelease = config.onRelease || function() {};
  };
  KAPhy.Interface.RectButton.prototype = Object.create(KAPhy.Interface.RectBasic.prototype);
  KAPhy.Interface.RectButton.prototype.update = function() {
    if(this.mouseOver()) this.onHover();
    if(this.down()) this.onHold();
    if(this.pressed()) this.onPress();
    if(this.released()) this.onRelease();
  };
}
if(!KAPhy.Interface.RectDragger) {
  KAPhy.Interface.RectDragger = function(config) {
    KAPhy.Interface.RectButton.call(this, config);
    
    this.onMove = config.onMove || function() {};
  };
  KAPhy.Interface.RectDragger.prototype = Object.create(KAPhy.Interface.RectButton.prototype);
  KAPhy.Interface.RectDragger.prototype.drag = function() {
    if(KAPhy.Interface.selected === this) {
      if(KAPhy.Canvas.pmouseX !== KAPhy.Canvas.mouseX ||
         KAPhy.Canvas.pmouseY !== KAPhy.Canvas.mouseY) {
        this.pos.x += KAPhy.Canvas.mouseX - KAPhy.Canvas.pmouseX;
        this.pos.y += KAPhy.Canvas.mouseY - KAPhy.Canvas.pmouseY;
        
        this.onMove();
      }
    }
  };
}
if(!KAPhy.Interface.updateSet) {
  KAPhy.Interface.updateSet = function(set) {
    for(var i = set.length - 1; i >= 0; i--) {
      set[i].display();
    }
    for(var i = 0; i < set.length; i++) {
      if(set[i] === KAPhy.Interface.selected) {
        set.push(set.splice(i, 1)[0]);
        return;
      }
    }
  };
}
if (!KAPhy.Canvas.configure) {
  KAPhy.Canvas.configure = function(canvasElement) {
    if (this.configured) {
      console.warn("KAPhy Warning - Please deconfigure canvas before reconfiguring it.");
      return;
    }

    KAPhy.Canvas.element = canvasElement;
    KAPhy.Canvas.configured = true;

    KAPhy.Canvas.relWidth = canvasElement.width;
    KAPhy.Canvas.relHeight = canvasElement.height;

    KAPhy.Canvas.context = canvasElement.getContext("2d");
    KAPhy.Canvas.context.fillStyle = "rgba(255, 255, 255, 1.0)";
    
    KAPhy.Canvas.pmouseX = 0;
    KAPhy.Canvas.pmouseY = 0;
    KAPhy.Canvas.mouseX = 0;
    KAPhy.Canvas.mouseY = 0;
    
    KAPhy.Canvas.mouseIsPressed = false;
    KAPhy.Canvas.pmouseIsPressed = false;
    
    KAPhy.Canvas.keys = {};
    KAPhy.Canvas.keyIsPressed = false;
    KAPhy.Canvas.lastKeyTriggered = null;
    KAPhy.Canvas.lastKeyEvent = null;
    
    KAPhy.Canvas.element.onmousemove = function(e) {
      var canvasBoundingRect = KAPhy.Canvas.element.getBoundingClientRect();
      KAPhy.Canvas.mouseX = Math.round(KAPhy.Canvas.toCanvasUnits(e.clientX - canvasBoundingRect.left));
      KAPhy.Canvas.mouseY = Math.round(KAPhy.Canvas.toCanvasUnits(e.clientY - canvasBoundingRect.top));
      
      if(KAPhy.Canvas.mouseMoved) {
        KAPhy.Canvas.mouseMoved();
      }
      if(KAPhy.Canvas.mouseIsPressed && KAPhy.Canvas.mouseDragged) {
        KAPhy.Canvas.mouseDragged();
      }
    };
    KAPhy.Canvas.element.onmousedown = function() {
      KAPhy.Canvas.mouseIsPressed = true;
      
      if(KAPhy.Canvas.mousePressed) { KAPhy.Canvas.mousePressed(); }
    };
    KAPhy.Canvas.element.onmouseup = function() {
      KAPhy.Canvas.mouseIsPressed = false;
      
      if(KAPhy.Canvas.mouseClicked) { KAPhy.Canvas.mouseClicked(); }
      if(KAPhy.Canvas.mouseReleased) { KAPhy.Canvas.mouseReleased(); }//These are exactly the same in PJS...
    };
    KAPhy.Canvas.element.onmouseout = function() {
      if(KAPhy.Canvas.mouseOut) { KAPhy.Canvas.mouseOut(); }
    };
    KAPhy.Canvas.element.onmouseover = function() {
      if(KAPhy.Canvas.mouseOver) { KAPhy.Canvas.mouseOver(); }
    };
    
    window.onkeydown = function(e) {
      if(KAPhy.Canvas.keys[e.key.toLowerCase()]) { return; }
      
      KAPhy.Canvas.keys[e.key.toLowerCase()] = true;
      
      KAPhy.Canvas.keyIsPressed = true;
      KAPhy.Canvas.lastKeyDown = e.key.toLowerCase();
      
      if(KAPhy.Canvas.keyPressed) { KAPhy.Canvas.keyPressed(); }
    };
    
    window.onkeyup = function(e) {
      if(!KAPhy.Canvas.keys[e.key.toLowerCase()]) { return; }
      
      KAPhy.Canvas.keys[e.key.toLowerCase()] = false;
      
      KAPhy.Canvas.lastKeyUp = e.key.toLowerCase();
      
      var scopeChanger = function() {
        for(var i in KAPhy.Canvas.keys) {
          if(KAPhy.Canvas.keys[i]) {
            return;
          }
        }
        KAPhy.Canvas.keyIsPressed = false;
      }();
      
      if(KAPhy.Canvas.keyReleased) { KAPhy.Canvas.keyReleased(); }
      if(KAPhy.Canvas.keyTyped) { KAPhy.Canvas.keyTyped(); }//These are exactly the same too, lol
    };
  };
}

if(!KAPhy.Canvas.toPixels) {
  KAPhy.Canvas.toPixels = function(n) {
    return n * KAPhy.Canvas.element.width/KAPhy.Canvas.relWidth;
  };
}
if(!KAPhy.Canvas.toCanvasUnits) {
  KAPhy.Canvas.toCanvasUnits = function(n) {
    return n * KAPhy.Canvas.relHeight/KAPhy.Canvas.element.height;
  }
}

if (!KAPhy.Canvas.deconfigure) {
  KAPhy.Canvas.deconfigure = function(canvasElement) {
    if (!this.configured) {
      console.warn("KAPhy warning - Attempted to reconfigure canvas.");
      return;
    }
    
    KAPhy.Canvas.element.onmousemove = null;
    KAPhy.Canvas.element.onmousedown = null;
    KAPhy.Canvas.element.onmouseup = null;
    KAPhy.Canvas.element.onmouseout = null;
    KAPhy.Canvas.element.onmouseover = null;
    KAPhy.Canvas.element = null;
    KAPhy.Canvas.configured = false;
    
    window.onkeydown = null;
    window.onkeyup = null;
    KAPhy.Canvas.lastKeyUp = null;
    KAPhy.Canvas.lastKeyDown = null;
    KAPhy.Canvas.keyIsPressed = null;
    KAPhy.Canvas.keys = null;

    KAPhy.Canvas.relWidth = null;
    KAPhy.Canvas.relHeight = null;

    KAPhy.Canvas.context = null;
    
    KAPhy.Canvas.mouseX = null;
    KAPhy.Canvas.mouseY = null;
    KAPhy.Canvas.mouseIsPressed = null;
    KAPhy.Canvas.pmouseIsPressed = null;
  };
}

if (!KAPhy.Canvas.resize) {
  KAPhy.Canvas.resize = function(relWidth, relHeight) {
    var envWidth = window.innerWidth;
    var envHeight = window.innerHeight;
    
    if(!envWidth  || envWidth  === 0) envWidth  = document.documentElement.clientWidth;
    if(!envHeight || envHeight === 0) envHeight = document.documentElement.clientHeight;
    
    if (!KAPhy.Canvas.configured) {
      console.warn("KAPhy warning - Attempted to resize when not configured");
      return;
    }

    KAPhy.Canvas.relWidth = relWidth;
    KAPhy.Canvas.relHeight = relHeight;

    if (envWidth / envHeight < relWidth / relHeight) {
      KAPhy.Canvas.element.width = envWidth;
      KAPhy.Canvas.element.height = relHeight / relWidth * envWidth;
    } else {
      KAPhy.Canvas.element.width = relWidth / relHeight * envHeight;
      KAPhy.Canvas.element.height = envHeight;
    }
  };
}

if(!KAPhy.Canvas.update) {
  KAPhy.Canvas.update = function() {
    if(!this.configured) {
      return;
    }
    
    KAPhy.Canvas.pmouseIsPressed = KAPhy.Canvas.mouseIsPressed;
    KAPhy.Canvas.pmouseX = KAPhy.Canvas.mouseX;
    KAPhy.Canvas.pmouseY = KAPhy.Canvas.mouseY;
    
    if(!KAPhy.Canvas.mouseIsPressed) KAPhy.Interface.selected = null;
  };
}
if(!KAPhy.Draw.fill) {
  KAPhy.Draw.fill = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length >= 1) {
      if(typeof arguments[0] === "object") {
        KAPhy.Canvas.context.fillStyle = "rgba(" + arguments[0].r + ", " + arguments[0].g + ", " + arguments[0].b + ", " + (arguments[0].a/255) + ")";
        return;
      }
    }
    
    switch(arguments.length) {
      case 0: KAPhy.Canvas.context.fillStyle = "#FFFFFF"; break;
      case 1: KAPhy.Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; break;
      case 2: KAPhy.Canvas.context.fillStyle = "rgba(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ", " + (arguments[1]/255) + ")"; break;
      case 3: KAPhy.Canvas.context.fillStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")"; break;
      case 4: KAPhy.Canvas.context.fillStyle = "rgba(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ", " + (arguments[3]/255) + ")"; break;
      default: console.warn("KAPhy Warning - KAPhy.Draw.fill() takes 0 - 4 arguments."); break;
    }
  };
}

if(!KAPhy.Draw.getFill) {
  KAPhy.Draw.getFill = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var hexDigitDec = function(digit) {
      switch(digit.toString().toLowerCase()) {
        case "0": return 0; break;
        case "1": return 1; break;
        case "2": return 2; break;
        case "3": return 3; break;
        case "4": return 4; break;
        case "5": return 5; break;
        case "6": return 6; break;
        case "7": return 7; break;
        case "8": return 8; break;
        case "9": return 9; break;
        case "a": return 10; break;
        case "b": return 11; break;
        case "c": return 12; break;
        case "d": return 13; break;
        case "e": return 14; break;
        case "f": return 15; break;
      }
    };
    
    var fillStyle = KAPhy.Canvas.context.fillStyle;
    if(fillStyle[0] === "#") {
      return {
        r: 16 * hexDigitDec(fillStyle[1]) + hexDigitDec(fillStyle[2]),
        g: 16 * hexDigitDec(fillStyle[3]) + hexDigitDec(fillStyle[4]),
        b: 16 * hexDigitDec(fillStyle[5]) + hexDigitDec(fillStyle[6]),
        a: 255
      };
    }
    else {
      fillStyle[0] = fillStyle[0].split("");
      fillStyle[0].splice(0, 5);
      fillStyle[0] = parseFloat(fillStyle[0].join(""));
      fillStyle[1] = parseFloat(fillStyle[1]);
      fillStyle[2] = parseFloat(fillStyle[2]);
      fillStyle[3] = fillStyle[3].split("");
      fillStyle[3].pop();
      fillStyle[3] = parseFloat(fillStyle[3].join(""));
      
      return {
        r: fillStyle[0],
        g: fillStyle[1], 
        b: fillStyle[2],
        a: fillStyle[3] * 255
      };
    }
  };
}

if(!KAPhy.Draw.getStroke) {
  KAPhy.Draw.getStroke = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var hexDigitDec = function(digit) {
      switch(digit.toString().toLowerCase()) {
        case "0": return 0; break;
        case "1": return 1; break;
        case "2": return 2; break;
        case "3": return 3; break;
        case "4": return 4; break;
        case "5": return 5; break;
        case "6": return 6; break;
        case "7": return 7; break;
        case "8": return 8; break;
        case "9": return 9; break;
        case "a": return 10; break;
        case "b": return 11; break;
        case "c": return 12; break;
        case "d": return 13; break;
        case "e": return 14; break;
        case "f": return 15; break;
      }
    };//Converts a hex digit to a decimal number
    
    var strokeStyle = KAPhy.Canvas.context.strokeStyle;
    if(strokeStyle[0] === "#") {
      return {
        r: 16 * hexDigitDec(strokeStyle[1]) + hexDigitDec(strokeStyle[2]),
        g: 16 * hexDigitDec(strokeStyle[3]) + hexDigitDec(strokeStyle[4]),
        b: 16 * hexDigitDec(strokeStyle[5]) + hexDigitDec(strokeStyle[6]),
        a: 255
      };
    }
    else {
      strokeStyle[0] = strokeStyle[0].split("");
      strokeStyle[0].splice(0, 5);
      strokeStyle[0] = parseFloat(strokeStyle[0].join(""));
      strokeStyle[1] = parseFloat(strokeStyle[1]);
      strokeStyle[2] = parseFloat(strokeStyle[2]);
      strokeStyle[3] = strokeStyle[3].split("");
      strokeStyle[3].pop();
      strokeStyle[3] = parseFloat(strokeStyle[3].join(""));
      
      return {
        r: strokeStyle[0],
        g: strokeStyle[1], 
        b: strokeStyle[2],
        a: strokeStyle[3] * 255
      };
    }
  };
}

if(!KAPhy.Draw.noFill) {
  KAPhy.Draw.noFill = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    KAPhy.Canvas.context.fillStyle = "rgba(0, 0, 0, 0.0)";
  };
}

if(!KAPhy.Draw.noStroke) {
  KAPhy.Draw.noStroke = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.noStroke() takes 0 arguments.");
    }
    
    KAPhy.Canvas.context.strokeStyle = "rgba(0, 0, 0, 0.0)";
  };
}

if(!KAPhy.Draw.stroke) {
  KAPhy.Draw.stroke = function(r, g, b, a) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length >= 1) {
      if(typeof arguments[0] === "object") {
        KAPhy.Canvas.context.strokeStyle = "rgba(" + arguments[0].r + ", " + arguments[0].g + ", " + arguments[0].b + ", " + (arguments[0].a/255) + ")";
        return;
      }
    }
    
    switch(arguments.length) {
      case 0: KAPhy.Canvas.context.strokeStyle = "#FFFFFF"; break;
      case 1: KAPhy.Canvas.context.strokeStyle = "rgb(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ")"; break;
      case 2: KAPhy.Canvas.context.strokeStyle = "rgba(" + arguments[0] + ", " + arguments[0] + ", " + arguments[0] + ", " + (arguments[1]/255) + ")"; break;
      case 3: KAPhy.Canvas.context.strokeStyle = "rgb(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ")"; break;
      case 4: KAPhy.Canvas.context.strokeStyle = "rgba(" + arguments[0] + ", " + arguments[1] + ", " + arguments[2] + ", " + (arguments[3]/255) + ")"; break;
      default: console.warn("KAPhy Warning - KAPhy.Draw.stroke() takes 0 - 4 arguments.");
    }
  };
}

if(!KAPhy.Draw.get) {
  KAPhy.Draw.get = function(x, y, w, h) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length === 4) {
      var imageData = KAPhy.Canvas.context.getImageData(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y), KAPhy.Canvas.toPixels(w), KAPhy.Canvas.toPixels(h));
      var newCanvas = document.createElement("canvas");
      newCanvas.width  = imageData.width;
      newCanvas.height = imageData.height;
      newCanvas.getContext("2d").putImageData(imageData, 0, 0);
      return newCanvas;
    }
    else if(arguments.length === 2) {
      var dataAtPoint = KAPhy.Canvas.context.getImageData(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y), 1, 1);
      return {
        r: dataAtPoint.data[0],
        g: dataAtPoint.data[1],
        b: dataAtPoint.data[2],
        a: dataAtPoint.data[3] * 255
      };
    }
  };
}

if(!KAPhy.Draw.image) {
  KAPhy.Draw.image = function(image, x, y, w, h, sx, sy, sw, sh) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other drawing commands when in shape mode.");
      return;
    }
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch (KAPhy.Draw.currentImageMode) {
      case CORNERS:
        realW = w - x;
        realH = h - y;
        break;
      case RADIUS:
        realX = x + w / 2;
        realY = y + h / 2;
        realW = w * 2;
        realH = h * 2;
        break;
      case CENTER:
        realX = x - w / 2;
        realY = y - h / 2;
        break;
    }
    
    realX = KAPhy.Canvas.toPixels(realX);
    realY = KAPhy.Canvas.toPixels(realY);
    realW = KAPhy.Canvas.toPixels(realW);
    realH = KAPhy.Canvas.toPixels(realH);
    
    switch(arguments.length) {
      case 3: KAPhy.Canvas.context.drawImage(image, realX, realY); break;
      case 5: KAPhy.Canvas.context.drawImage(image, realX, realY, realW, realH); break;
      case 9: KAPhy.Canvas.context.drawImage(image, realX, realY, realW, realH, sx, sy, sw, sh); break;
      default: console.warn("KAPhy Warning - KAPhy.Draw.image() takes 3, 5, or 9 arguments."); break;
    }
  };
}

if(!Images) {
  var Images = {
    avatarTeam: "https://www.kasandbox.org/programming-images/avatars/avatar-team.png",
    aqualineSeed: "https://www.kasandbox.org/programming-images/avatars/aqualine-seed.png",
    aqualineSeedling: "https://www.kasandbox.org/programming-images/avatars/aqualine-seedling.png",
    aqualineSapling: "https://www.kasandbox.org/programming-images/avatars/aqualine-sapling.png",
    aqualineTree: "https://www.kasandbox.org/programming-images/avatars/aqualine-tree.png",
    aqualineUltimate: "https://www.kasandbox.org/programming-images/avatars/aqualine-ultimate.png",
    duskpinSeed: "https://www.kasandbox.org/programming-images/avatars/duskpin-seed.png",
    duskpinSeedling: "https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png",
    duskpinSapling: "https://www.kasandbox.org/programming-images/avatars/duskpin-sapling.png",
    duskpinTree: "https://www.kasandbox.org/programming-images/avatars/duskpin-tree.png",
    duskpinUltimate: "https://www.kasandbox.org/programming-images/avatars/duskpin-ultimate.png",
    leafersSeed: "https://www.kasandbox.org/programming-images/avatars/leafers-seed.png",
    leafersSeedling: "https://www.kasandbox.org/programming-images/avatars/leafers-seedling.png",
    leafersSapling: "https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png",
    leafersTree: "https://www.kasandbox.org/programming-images/avatars/leafers-tree.png",
    leafersUltimate: "https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png",
    piceratopsSeed: "https://www.kasandbox.org/programming-images/avatars/piceratops-seed.png",
    piceratopsSeedling: "https://www.kasandbox.org/programming-images/avatars/piceratops-seedling.png",
    piceratopsSapling: "https://www.kasandbox.org/programming-images/avatars/piceratops-sapling.png",
    piceratopsTree: "https://www.kasandbox.org/programming-images/avatars/piceratops-tree.png",
    piceratopsUltimate: "https://www.kasandbox.org/programming-images/avatars/piceratops-ultimate.png",
    primosaurSeed: "https://www.kasandbox.org/programming-images/avatars/primosaur-seed.png",
    primosaurSeedling: "https://www.kasandbox.org/programming-images/avatars/primosaur-seedling.png",
    primosaurSapling: "https://www.kasandbox.org/programming-images/avatars/primosaur-sapling.png",
    primosaurTree: "https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png",
    primosaurUltimate: "https://www.kasandbox.org/programming-images/avatars/primosaur-ultimate.png",
    starkySeed: "https://www.kasandbox.org/programming-images/avatars/starky-seed.png",
    starkySeedling: "https://www.kasandbox.org/programming-images/avatars/starky-seedling.png",
    starkySapling: "https://www.kasandbox.org/programming-images/avatars/starky-sapling.png",
    starkyTree: "https://www.kasandbox.org/programming-images/avatars/starky-tree.png",
    starkyUltimate: "https://www.kasandbox.org/programming-images/avatars/starky-ultimate.png",
    leafBlue: "https://www.kasandbox.org/programming-images/avatars/leaf-blue.png",
    leafGreen: "https://www.kasandbox.org/programming-images/avatars/leaf-green.png",
    leafGray: "https://www.kasandbox.org/programming-images/avatars/leaf-gray.png",
    leafOrange: "https://www.kasandbox.org/programming-images/avatars/leaf-orange.png",
    leafRed: "https://www.kasandbox.org/programming-images/avatars/leaf-red.png",
    leafYellow: "https://www.kasandbox.org/programming-images/avatars/leaf-yellow.png",
    marcimus: "https://www.kasandbox.org/programming-images/avatars/marcimus.png",
    marcimusOrange: "https://www.kasandbox.org/programming-images/avatars/marcimus-orange.png",
    marcimusPurple: "https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png",
    marcimusRed: "https://www.kasandbox.org/programming-images/avatars/marcimus-red.png",
    mrPants: "https://www.kasandbox.org/programming-images/avatars/mr-pants.png",
    mrPantsGreen: "https://www.kasandbox.org/programming-images/avatars/mr-pants-green.png",
    mrPantsOrange: "https://www.kasandbox.org/programming-images/avatars/mr-pants-orange.png",
    mrPantsPink: "https://www.kasandbox.org/programming-images/avatars/mr-pants-pink.png",
    mrPantsPurple: "https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png",
    mrPantsWithHat: "https://www.kasandbox.org/programming-images/avatars/mr-pants-with-hats.png",
    oldSpiceMan: "https://www.kasandbox.org/programming-images/avatars/old-spice-man.png",
    oldSpiceManBlue: "https://www.kasandbox.org/programming-images/avatars/old-spice-man.png",
    orangeJuiceSquid: "https://www.kasandbox.org/programming-images/avatars/orange-juice-squid.png",
    purplePi: "https://www.kasandbox.org/programming-images/avatars/purple-pi.png",
    purplePiPink: "https://www.kasandbox.org/programming-images/avatars/purple-pi-pink.png",
    purplePiTeal: "https://www.kasandbox.org/programming-images/avatars/purple-pi-teal.png",
    questionMark: "https://www.kasandbox.org/programming-images/avatars/questionmark.png",
    robotFemale1: "https://www.kasandbox.org/programming-images/avatars/robot_female_1.png",
    robotFemale2: "https://www.kasandbox.org/programming-images/avatars/robot_female_2.png",
    robotFemale3: "https://www.kasandbox.org/programming-images/avatars/robot_female_3.png",
    robotMale1: "https://www.kasandbox.org/programming-images/avatars/robot_male_1.png",
    robotMale2: "https://www.kasandbox.org/programming-images/avatars/robot_male_2.png",
    robotMale3: "https://www.kasandbox.org/programming-images/avatars/robot_male_3.png",
    spunkySam: "https://www.kasandbox.org/programming-images/avatars/spunky-sam.png",
    spunkySamGreen: "https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png",
    spunkySamOrange: "https://www.kasandbox.org/programming-images/avatars/spunky-sam-orange.png",
    spunkySamRed: "https://www.kasandbox.org/programming-images/avatars/spunky-sam-red.png",
    hopperHappy: "https://www.kasandbox.org/programming-images/creatures/Hopper-Happy.png",
    hopperCool: "https://www.kasandbox.org/programming-images/creatures/Hopper-Cool.png",
    hopperJumping: "https://www.kasandbox.org/programming-images/creatures/Hopper-Jumping.png",
    ohNoes: "https://www.kasandbox.org/programming-images/creatures/OhNoes.png",
    babyWinston: "https://www.kasandbox.org/programming-images/creatures/BabyWinston.png",
    winston: "https://www.kasandbox.org/programming-images/creatures/Winston.png",
    blank: "https://www.kasandbox.org/programming-images/cute/Blank.png",
    brownBlock: "https://www.kasandbox.org/programming-images/cute/BrownBlock.png",
    characterBoy: "https://www.kasandbox.org/programming-images/cute/CharacterBoy.png",
    characterCatGirl: "https://www.kasandbox.org/programming-images/cute/CharacterCatGirl.png",
    characterHornGirl: "https://www.kasandbox.org/programming-images/cute/CharacterHornGirl.png",
    characterPinkGirl: "https://www.kasandbox.org/programming-images/cute/CharacterPinkGirl.png",
    characterPrincessGirl: "https://www.kasandbox.org/programming-images/cute/CharacterPrincessGirl.png",
    chestClosed: "https://www.kasandbox.org/programming-images/cute/ChestClosed.png",
    chestLid: "https://www.kasandbox.org/programming-images/cute/ChestLid.png",
    chestOpen: "https://www.kasandbox.org/programming-images/cute/ChestOpen.png",
    dirtBlock: "https://www.kasandbox.org/programming-images/cute/ChestClosed.png",
    doorTallClosed: "https://www.kasandbox.org/programming-images/cute/DoorTallClosed.png",
    doorTallOpen: "https://www.kasandbox.org/programming-images/cute/DoorTallOpen.png",
    enemyBug: "https://www.kasandbox.org/programming-images/cute/EnemyBug.png",
    gemBlue: "https://www.kasandbox.org/programming-images/cute/GemBlue.png",
    gemGreen: "https://www.kasandbox.org/programming-images/cute/GemGreen.png",
    gemOrange: "https://www.kasandbox.org/programming-images/cute/GemOrange.png",
    grassBlock: "https://www.kasandbox.org/programming-images/cute/GrassBlock.png",
    heart: "https://www.kasandbox.org/programming-images/cute/Heart.png",
    key: "https://www.kasandbox.org/programming-images/cute/Key.png",
    plainBlock: "https://www.kasandbox.org/programming-images/cute/PlainBlock.png",
    rampEast: "https://www.kasandbox.org/programming-images/cute/RampEast.png",
    rampNorth: "https://www.kasandbox.org/programming-images/cute/RampNorth.png",
    rampSouth: "https://www.kasandbox.org/programming-images/cute/RampEast.png",
    rampWest: "https://www.kasandbox.org/programming-images/cute/RampWest.png",
    rock: "https://www.kasandbox.org/programming-images/cute/Rock.png",
    roofEast: "https://www.kasandbox.org/programming-images/cute/RampEast.png",
    roofNorth: "https://www.kasandbox.org/programming-images/cute/RampEast.png",
    rampSouth: "https://www.kasandbox.org/programming-images/cute/RampEast.png",
    rampWest: "https://www.kasandbox.org/programming-images/cute/RampEast.png",
    roofNorthEast: "https://www.kasandbox.org/programming-images/cute/RoofNorthEast.png",
    roofNorthWest: "https://www.kasandbox.org/programming-images/cute/RoofNorthWest.png",
    roofSouthEast: "https://www.kasandbox.org/programming-images/cute/RoofSouthEast.png",
    roofSouthWest: "https://www.kasandbox.org/programming-images/cute/RoofSouthWest.png",
    selector: "https://www.kasandbox.org/programming-images/cute/Selector.png",
    shadowEast: "https://www.kasandbox.org/programming-images/cute/ShadowEast.png",
    shadowWest: "https://www.kasandbox.org/programming-images/cute/ShadowWest.png",
    shadowNorth: "https://www.kasandbox.org/programming-images/cute/ShadowNorth.png",
    shadowSouth: "https://www.kasandbox.org/programming-images/cute/ShadowSouth.png",
    shadowNorthEast: "https://www.kasandbox.org/programming-images/cute/ShadowNorthEast.png",
    shadowNorthWest: "https://www.kasandbox.org/programming-images/cute/ShadowNorthWest.png",
    shadowSouthEast: "https://www.kasandbox.org/programming-images/cute/ShadowSouthEast.png",
    shadowSouthWest: "https://www.kasandbox.org/programming-images/cute/ShadowSouthWest.png",
    shadowSideWest: "https://www.kasandbox.org/programming-images/cute/ShadowSideWest.png",
    star: "https://www.kasandbox.org/programming-images/cute/Star.png",
    stoneBlock: "https://www.kasandbox.org/programming-images/cute/StoneBlock.png",
    stoneBlockTall: "https://www.kasandbox.org/programming-images/cute/StoneBlockTall.png",
    treeShort: "https://www.kasandbox.org/programming-images/cute/TreeShort.png",
    treeTall: "https://www.kasandbox.org/programming-images/cute/TreeTall.png",
    treeUgly: "https://www.kasandbox.org/programming-images/cute/TreeUgly.png",
    wallBlock: "https://www.kasandbox.org/programming-images/cute/WallBlock.png",
    wallBlockTall: "https://www.kasandbox.org/programming-images/cute/WallBlockTall.png",
    waterBlock: "https://www.kasandbox.org/programming-images/cute/WaterBlock.png",
    windowTall: "https://www.kasandbox.org/programming-images/cute/WindowTall.png",
    woodBlock: "https://www.kasandbox.org/programming-images/cute/WoodBlock.png",
    background: "https://www.kasandbox.org/programming-images/space/background.png",
    beetleship: "https://www.kasandbox.org/programming-images/space/beetleship.png",
    collisioncircle: "https://www.kasandbox.org/programming-images/space/collisioncircle.png",
    girl1: "https://www.kasandbox.org/programming-images/space/girl1.png",
    girl2: "https://www.kasandbox.org/programming-images/space/girl2.png",
    girl3: "https://www.kasandbox.org/programming-images/space/girl3.png",
    girl4: "https://www.kasandbox.org/programming-images/space/girl4.png",
    girl5: "https://www.kasandbox.org/programming-images/space/girl5.png",
    healthHeart: "https://www.kasandbox.org/programming-images/space/healthheart.png",
    minus: "https://www.kasandbox.org/programming-images/space/minus.png",
    octopus: "https://www.kasandbox.org/programming-images/space/octopus.png",
    planet: "https://www.kasandbox.org/programming-images/space/planet.png",
    plus: "https://www.kasandbox.org/programming-images/space/plus.png",
    rocketShip: "https://www.kasandbox.org/programming-images/space/rocketship.png",
    star2: "https://www.kasandbox.org/programming-images/space/star.png",
    zero: "https://www.kasandbox.org/programming-images/space/0.png",
    one: "https://www.kasandbox.org/programming-images/space/1.png",
    two: "https://www.kasandbox.org/programming-images/space/2.png",
    three: "https://www.kasandbox.org/programming-images/space/3.png",
    four: "https://www.kasandbox.org/programming-images/space/4.png",
    five: "https://www.kasandbox.org/programming-images/space/5.png",
    six: "https://www.kasandbox.org/programming-images/space/6.png",
    seven: "https://www.kasandbox.org/programming-images/space/7.png",
    eight: "https://www.kasandbox.org/programming-images/space/8.png",
    nine: "https://www.kasandbox.org/programming-images/space/9.png",
  };
}

if(!KAPhy.Draw.loadImage) {
  KAPhy.Draw.loadImage = function(imageName, onLoad) {
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.loadImage() takes 1 or 2 arguments.");
      return;
    }
    
    if(!Images[imageName]) {
      console.warn("KAPhy Warning - Tried to load invalid image.");
      return;
    }
    
    var imageToLoad = new Image();
    imageToLoad.onload = onLoad;
    imageToLoad.src = Images[imageName];
  };
}

if(!KAPhy.Draw.loadImageSet) {
  KAPhy.Draw.loadImageSet = function(imagesToLoad, onFinish) {
    if(arguments.length === 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.loadImageSet() takes at least 1 argument.");
      return;
    }
    
    var imagesLoaded = 0;
    var loadedImages = [];
    
    for(var i = 0; i < imagesToLoad.length; i++) {
      KAPhy.Draw.loadImage(imagesToLoad[i], function() {
        loadedImages.push(this);
        imagesLoaded++;
        if(imagesLoaded >= imagesToLoad.length) {
          onFinish.call(loadedImages);
        }
      });
    }
  };
}

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

if(!KAPhy.Draw.pushMatrix) {
  KAPhy.Draw.pushMatrix = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You cannot use transformation commands in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.save();
  };
}

if(!KAPhy.Draw.resetMatrix) {
  KAPhy.Draw.resetMatrix = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You cannot use transformation commands in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.setTransform(1, 0, 0, 1, 0, 0);
  };
}

if(!KAPhy.Draw.rotate) {
  KAPhy.Draw.rotate = function(t) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length !== 1) {
      console.warn("KAPhy Warning - KAPhy.Draw.rotate() takes 1 argument.");
      return;
    }
    
    KAPhy.Canvas.context.rotate(t);
  };
}

if(!KAPhy.Draw.scale) {
  KAPhy.Draw.scale = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.scale() takes 1 - 2 arguments.");
      return;
    }
    
    KAPhy.Canvas.context.scale(x, y || x);
  };
}

if(!KAPhy.Draw.skew) {
  KAPhy.Draw.skew = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.skew() takes 1 - 2 arguments.");
      return;
    }
    
    KAPhy.Canvas.context.transform(1, x, y || 0, 1, 0, 0);
  };
}

if(!KAPhy.Draw.translate) {
  KAPhy.Draw.translate = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use transformation commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.translate() takes 1 - 2 arguments.");
      return;
    }
    
    KAPhy.Canvas.context.translate(KAPhy.Canvas.toPixels(x || 0), KAPhy.Canvas.toPixels(y || 0));
  };
}

if(!KAPhy.Draw.ellipseMode) {
  KAPhy.Draw.ellipseMode = function(newMode) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newMode === CENTER || newMode === CORNER || newMode === CORNERS || newMode === RADIUS) {
      KAPhy.Draw.currentEllipseMode = newMode;
    }
  };
}

if(!KAPhy.Draw.getEllipseMode) {
  KAPhy.Draw.getEllipseMode = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Draw.currentEllipseMode;
  };
}

if(!KAPhy.Draw.getImageMode) {
  KAPhy.Draw.getImageMode = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Draw.currentImageMode;
  };
}

if(!KAPhy.Draw.getRectMode) {
  KAPhy.Draw.getRectMode = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Draw.currentRectMode;
  };
}

if(!KAPhy.Draw.getStrokeCap) {
  KAPhy.Draw.getStrokeCap = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Canvas.context.lineCap;
  };
}

if(!KAPhy.Draw.getStrokeJoin) {
  KAPhy.Draw.getStrokeJoin = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Canvas.context.lineJoin;
  };
}

if(!KAPhy.Draw.getStrokeWeight) {
  KAPhy.Draw.getStrokeWeight = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    return KAPhy.Canvas.toCanvasUnits(KAPhy.Canvas.context.lineWidth || 0);
  };
}

if(!KAPhy.Draw.getTextAlign) {
  KAPhy.Draw.getTextAlign = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length > 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.getTextAlign() takes 0 arguments.");
    }
    
    return KAPhy.Canvas.context.textAlign;
  };
}

if(!KAPhy.Draw.getTextBaseline) {
  KAPhy.Draw.getTextBaseline = function(newAlign, yAlign) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.textAlign() takes 0 arguments.");
    }
    
    return KAPhy.Canvas.context.textBaseline;
  };
}

if(!KAPhy.Draw.getTextFont) {
  KAPhy.Draw.getTextFont = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    return KAPhy.Canvas.toCanvasUnits(currentFont[currentFont.length - 1]);
  };
}

if(!KAPhy.Draw.getTextLineSpacing) {
  KAPhy.Draw.getTextLineSpacing = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 0) {
      console.warn("KAPhy Warning - KAPhy.Draw.getTextLineSpacing() takes 0 argument.");
    }
    
    return KAPhy.Draw.currentTextLineSpacing;
  };
}
if(!KAPhy.Draw.getTextSize) {
  KAPhy.Draw.getTextSize = function(size) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    return KAPhy.Canvas.toCanvasUnits(parseInt(currentFont[currentFont.length - 2]));
  };
}

if(!KAPhy.Draw.imageMode) {
  KAPhy.Draw.imageMode = function(newMode) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newMode === CENTER || newMode === CORNER || newMode === CORNERS || newMode === RADIUS) {
      KAPhy.Draw.currentImageMode = newMode;
    }
  };
}

if(!KAPhy.Draw.loadFont) {
  KAPhy.Draw.loadFont = function(font, onLoad) {
    var newLink = document.createElement("link");
    
    newLink.rel = "stylesheet";
    newLink.href = "https://fonts.googleapis.com/css?family=" + font;
    
    newLink.onload = onLoad;
    
    document.head.appendChild(newLink);
  };
}

if(!KAPhy.Draw.loadFontSet) {
  KAPhy.Draw.loadFontSet = function(fonts, onFinish) {
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

if(!KAPhy.Draw.rectMode) {
  KAPhy.Draw.rectMode = function(newMode) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newMode === CENTER || newMode === CORNER || newMode === CORNERS || newMode === RADIUS) {
      KAPhy.Draw.currentRectMode = newMode;
    }
  };
}

if(!KAPhy.Draw.strokeCap) {
  KAPhy.Draw.strokeCap = function(newCap) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newCap === ROUND || newCap === SQUARE || newCap === PROJECT) {
      KAPhy.Canvas.context.lineCap = newCap;
    }
  };
}

if(!KAPhy.Draw.strokeJoin) {
  KAPhy.Draw.strokeJoin = function(newJoin) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(newJoin === MITER || newJoin === ROUND || newJoin === BEVEL) {
      KAPhy.Canvas.context.lineJoin = newJoin;
    }
  };
}

if(!KAPhy.Draw.strokeWeight) {
  KAPhy.Draw.strokeWeight = function(strokeWeight) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use color commands when in shape mode.");
      return;
    }
    
    if(arguments.length > 1) {
      console.warn("KAPhy Warning - KAPhy.Draw.strokeWeight() takes 0 or 1 arguments.");
    }
    
    KAPhy.Canvas.context.lineWidth = KAPhy.Canvas.toPixels(strokeWeight || 0);
  };
}

if(!KAPhy.Draw.textAlign) {
  KAPhy.Draw.textAlign = function(newAlign, yAlign) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length > 2) {
      console.warn("KAPhy Warning - KAPhy.Draw.textAlign() takes 0 - 2 arguments.");
    }
    
    KAPhy.Canvas.context.textAlign = newAlign || "left";
    if(yAlign) KAPhy.Canvas.context.textBaseline = yAlign;
  };
}

if(!KAPhy.Draw.textFont) {
  KAPhy.Draw.textFont = function(font, size, variant) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    KAPhy.Canvas.context.font = (variant ? (variant + " ") : "") + Math.round(size ? KAPhy.Canvas.toPixels(size) : parseInt(currentFont[currentFont.length - 2])) + "px " + font;
  };
}

if(!KAPhy.Draw.textLineSpacing) {
  KAPhy.Draw.textLineSpacing = function(newSpacing) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(arguments.length !== 1) {
      console.warn("KAPhy Warning - KAPhy.Draw.textLineSpacing() takes 1 argument.");
    }
    
    KAPhy.Draw.currentTextLineSpacing = (newSpacing === 0 ? 0 : (newSpacing || 0.4));
  };
}
if(!KAPhy.Draw.textSize) {
  KAPhy.Draw.textSize = function(size) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    var currentFont = KAPhy.Canvas.context.font.split(" ");
    
    KAPhy.Canvas.context.font = (currentFont.length === 3 ? (currentFont[0] + " ") : "") + KAPhy.Canvas.toPixels(Math.round(size)) + "px " + currentFont[currentFont.length - 1];
  };
}

if(!KAPhy.Draw.arc) {
  KAPhy.Draw.arc = function(x, y, w, h, start, stop) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch(KAPhy.Draw.currentEllipseMode) {
      case CORNER: 
        realX = x - w/2;
        realY = y - h/2; break;
      case CORNERS:
        realX = (x + w)/2;
        realY = (y + h)/2;
        realW = w - x;
        realH = h - y; break;
      case RADIUS: 
        realW = w * 2;
        realH = h * 2; break;
    }
    
    if(KAPhy.Canvas.configured) {
      realX = KAPhy.Canvas.toPixels(realX);
      realY = KAPhy.Canvas.toPixels(realY);
      realW = KAPhy.Canvas.toPixels(realW);
      realH = KAPhy.Canvas.toPixels(realH);
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.ellipse(realX, realY, realW, realH, 0, start, stop);
    KAPhy.Canvas.context.lineTo(realX, realY);
    KAPhy.Canvas.context.fill();
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.ellipse(realX, realY, realW, realH, 0, start, stop);
    KAPhy.Canvas.context.stroke();
  };
}

if(!KAPhy.Draw.background) {
  KAPhy.Draw.background = function(r, g, b, a) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    var oldFill = KAPhy.Canvas.context.fillStyle;
    
    KAPhy.Canvas.context.save();
    KAPhy.Canvas.context.resetTransform();
    
    switch(arguments.length) {
      case 0: KAPhy.Draw.fill(); break;
      case 1: KAPhy.Draw.fill(r); break;
      case 2: KAPhy.Draw.fill(r, g); break;
      case 3: KAPhy.Draw.fill(r, g, b); break;
      case 4: KAPhy.Draw.fill(r, g, b, a); break;
    }
    
    KAPhy.Canvas.context.fillRect(0, 0, KAPhy.Canvas.element.width, KAPhy.Canvas.element.height);
    
    KAPhy.Canvas.context.restore();
  }
}

if(!KAPhy.Draw.beginShape) {
  KAPhy.Draw.beginShape = function() {
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - Cannot reinitialize shape.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Draw.shapeOn = true;
  };
}

if(!KAPhy.Draw.bezierVertex) {
  KAPhy.Draw.bezierVertex = function(cx1, cy1, cx2, cy2, x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use KAPhy.Draw.bezierVertex() in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.bezierCurveTo(KAPhy.Canvas.toPixels(cx1), KAPhy.Canvas.toPixels(cy1), KAPhy.Canvas.toPixels(cx2), KAPhy.Canvas.toPixels(cy2), KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
  };
}

if(!KAPhy.Draw.ellipse) {
  KAPhy.Draw.ellipse = function(x, y, w, h) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch(KAPhy.Draw.currentEllipseMode) {
      case CORNER: 
        realX = x - w/2;
        realY = y - h/2; break;
      case CORNERS:
        realX = (x + w)/2;
        realY = (y + h)/2;
        realW = w - x;
        realH = h - y; break;
      case RADIUS: 
        realW = w * 2;
        realH = h * 2; break;
    }
    
    if(KAPhy.Canvas.configured) {
      realX = KAPhy.Canvas.toPixels(realX);
      realY = KAPhy.Canvas.toPixels(realY);
      realW = KAPhy.Canvas.toPixels(realW/2);
      realH = KAPhy.Canvas.toPixels(realH/2);
    }
    
    KAPhy.Canvas.context.ellipse(realX, realY, realW, realH, 0, 0, 6.3);
    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
  };
}

if(!KAPhy.Draw.ellipseSection) {
  KAPhy.Draw.ellipseSection = function(x, y, w, h, start, stop) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    
    var realX = x,
        realY = y,
        realW = w,
        realH = h;
    
    switch(KAPhy.Draw.currentEllipseMode) {
      case CORNER: 
        realX = x - w/2;
        realY = y - h/2; break;
      case CORNERS:
        realX = (x + w)/2;
        realY = (y + h)/2;
        realW = w - x;
        realH = h - y; break;
      case RADIUS: 
        realW = w * 2;
        realH = h * 2; break;
    }
    
    if(KAPhy.Canvas.configured) {
      realX = KAPhy.Canvas.toPixels(realX);
      realY = KAPhy.Canvas.toPixels(realY);
      realW = KAPhy.Canvas.toPixels(realW);
      realH = KAPhy.Canvas.toPixels(realH);
    }
    
    KAPhy.Canvas.context.ellipse(realX, realY, realW, realH, 0, start, stop);
    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
  };
}

if(!KAPhy.Draw.endShape) {
  KAPhy.Draw.endShape = function() {
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - Cannot end nonexistent shape.");
      return;
    }
    
    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
    KAPhy.Draw.shapeOn = false;
  };
}

if(!KAPhy.Draw.line) {
  KAPhy.Draw.line = function(x1, y1, x2, y2) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.moveTo(x1, y1);
    KAPhy.Canvas.context.lineTo(x2, y2);
    KAPhy.Canvas.context.stroke();
  };
}

if(!KAPhy.Draw.point) {
  KAPhy.Draw.point = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.moveTo(x, y);
    KAPhy.Canvas.context.lineTo(x, y);
    KAPhy.Canvas.context.stroke();
  };
}

if(!KAPhy.Draw.poly) {
  KAPhy.Draw.poly = function() {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.beginPath();
    KAPhy.Canvas.context.moveTo(KAPhy.Canvas.toPixels(arguments[0]), KAPhy.Canvas.toPixels(arguments[1]));
    for(var i = 2; i < arguments.length; i += 2) {
      KAPhy.Canvas.context.lineTo(KAPhy.Canvas.toPixels(arguments[i]), KAPhy.Canvas.toPixels(arguments[i + 1]));
    }
    KAPhy.Canvas.context.closePath();
    
    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
  };
}

if(!KAPhy.Draw.quadVertex) {
  KAPhy.Draw.quadVertex = function(cx, cy, x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use KAPhy.Draw.quadVertex() in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.quadraticCurveTo(KAPhy.Canvas.toPixels(cx), KAPhy.Canvas.toPixels(cy), KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
  };
}

if (!KAPhy.Draw.rect) {
  KAPhy.Draw.rect = function(x, y, w, h, tl, tr, br, bl) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    if(arguments.length > 8 || arguments.length < 4) {
      console.warn("KAPhy Warning - KAPhy.Draw.rect() takes 4 - 8 arguments.");
      return;
    }
    
    var realX = x,
      realY = y,
      realW = w,
      realH = h;

    switch (KAPhy.Draw.currentRectMode) {
      case CORNERS:
        realW = w - x;
        realH = h - y;
        break;
      case RADIUS:
        realX = x + w / 2;
        realY = y + h / 2;
        realW = w * 2;
        realH = h * 2;
        break;
      case CENTER:
        realX = x - w / 2;
        realY = y - h / 2;
        break;
    }
    
    realX = KAPhy.Canvas.toPixels(realX);
    realY = KAPhy.Canvas.toPixels(realY);
    realW = KAPhy.Canvas.toPixels(realW);
    realH = KAPhy.Canvas.toPixels(realH);
    
    tl = tl || 0;
    tr = tr || tl;
    br = br || tl;
    bl = bl || tl;

    KAPhy.Canvas.context.beginPath();

    KAPhy.Canvas.context.moveTo(realX + KAPhy.Canvas.toPixels(tl), realY);
    KAPhy.Canvas.context.lineTo(realX + realW - KAPhy.Canvas.toPixels(tr), realY);
    KAPhy.Canvas.context.quadraticCurveTo(realX + realW, realY, realX + realW, realY + KAPhy.Canvas.toPixels(tr));
    KAPhy.Canvas.context.lineTo(realX + realW, realY + realH - KAPhy.Canvas.toPixels(br));
    KAPhy.Canvas.context.quadraticCurveTo(realX + realW, realY + realH, realX + realW - KAPhy.Canvas.toPixels(br), realY + realH);
    KAPhy.Canvas.context.lineTo(realX + KAPhy.Canvas.toPixels(bl), realY + realH);
    KAPhy.Canvas.context.quadraticCurveTo(realX, realY + realH, realX, realY + realH - KAPhy.Canvas.toPixels(bl));
    KAPhy.Canvas.context.lineTo(realX, realY + KAPhy.Canvas.toPixels(tl));
    KAPhy.Canvas.context.quadraticCurveTo(realX, realY, realX + KAPhy.Canvas.toPixels(tl), realY);
    KAPhy.Canvas.context.closePath();

    KAPhy.Canvas.context.fill();
    KAPhy.Canvas.context.stroke();
  };
}

if(!KAPhy.Draw.text) {
  KAPhy.Draw.text = function(content, x, y) {
    
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can't use other shape commands when in shape mode.");
      return;
    }
    
    if(arguments.length === 0 || arguments.length > 3) {
      console.warn("KAPhy Warning - KAPhy.Draw.text() takes 1 - 3 arguments.");
    }
    
    var size = KAPhy.Draw.getTextSize();
    
    var enterSplit = content.split("\n");
    
    var adjust = 0;
    if(KAPhy.Draw.getTextBaseline().toLowerCase() === "middle") {
      adjust = -0.5 * (enterSplit.length - 1) * size * (1 + KAPhy.Draw.currentTextLineSpacing);
    }
    
    
    for(var i = 0; i < enterSplit.length; i++) {
      KAPhy.Canvas.context.fillText(enterSplit[i], KAPhy.Canvas.toPixels(x || 0), adjust + KAPhy.Canvas.toPixels(y || 0) + i * size * (1 + KAPhy.Draw.currentTextLineSpacing));
    }
  };
}

if(!KAPhy.Draw.vertex) {
  KAPhy.Draw.vertex = function(x, y) {
    if(!KAPhy.Canvas.configured) {
      console.warn("KAPhy Warning - You must use KAPhy.Canvas.configure(); before you can draw!");
      return;
    }
    
    if(!KAPhy.Draw.shapeOn) {
      console.warn("KAPhy Warning - You can only use KAPhy.Draw.vertex() in shape mode.");
      return;
    }
    
    KAPhy.Canvas.context.lineTo(KAPhy.Canvas.toPixels(x), KAPhy.Canvas.toPixels(y));
  };
}

KAPhy.Physics.Circle = function(config) {
  /** Position and Velocity **/
  this.pos = config.pos || new KAPhy.Physics.Vector2(config.x || 0, config.y || 0);
  this.vel = config.vel || new KAPhy.Physics.Vector2(config.vx || 0, config.vy || 0);

  this.pos = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.pos.x), KAPhy.Canvas.toPixels(this.pos.y));
  this.vel = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.vel.x), KAPhy.Canvas.toPixels(this.vel.y));

  /** Bounciness **/
  this.bcf = config.bcf || 0.75;

  /** Radius **/
  this.rad = config.rad || 15;

  /** Array of Constraints **/
  this.constraints = [];

  /** Physical Sleep **/
  this.asleep = false;

  /** Array of Position Adjustments **/
  this.posAdjustments = [];

  /** Mass **/
  this.mass = config.mass || 1;

  /** Fixed or Not **/
  this.fixed = config.fixed || false;

  /** Variables Used When Submerged**/
  this.buoyancyForce = 0;
  this.waterDrag = 1;
};

/** Core **/
KAPhy.Physics.Circle.prototype.update = function() {
  if (this.fixed) {
    this.asleep = false;
    this.vel = new KAPhy.Physics.Vector2();
    return;
  }

  if (this.vel.magSq() > KAPhy.Physics.sleepThreshold * KAPhy.Physics.sleepThreshold || this.buoyancyForce > 0) {
    this.asleep = false;
  }
  this.pos.add(this.vel) //Add velocity to position

  this.vel.y += KAPhy.Canvas.toPixels(KAPhy.Physics.gravityForce - this.buoyancyForce); //Gravity

  this.vel.mult((this.asleep ? KAPhy.Physics.airResistanceSleeping : this.waterDrag * KAPhy.Physics.airResistance)); //Air resistance

  this.buoyancyForce = 0;
  this.waterDrag = 1;

  this.manageAdjustments();
};
KAPhy.Physics.Circle.prototype.draw = function() {
  KAPhy.Draw.ellipse(KAPhy.Canvas.toCanvasUnits(this.pos.x), KAPhy.Canvas.toCanvasUnits(this.pos.y), this.rad * 2, this.rad * 2);
};
KAPhy.Physics.Circle.prototype.display = function() {
  if (this.move) {
    this.move();
  }
  this.update();
  this.draw();
};
KAPhy.Physics.Circle.prototype.manageAdjustments = function() {
  if (this.posAdjustments.length === 0) {
    return;
  }

  var adjustmentAvg = new KAPhy.Physics.Vector2();
  for (var i = 0; i < this.posAdjustments.length; i++) {
    adjustmentAvg.add(this.posAdjustments[i]);
  }
  this.pos = KAPhy.Physics.Vector2.lerp(this.pos, KAPhy.Physics.Vector2.div(adjustmentAvg, this.posAdjustments.length), KAPhy.Physics.constraintAdjustment);

  this.posAdjustments = [];
};
KAPhy.Physics.Circle.prototype.trySleep = function() {
  if (KAPhy.Physics.Vector2.magSq(this.vel) < KAPhy.Physics.sleepThreshold * KAPhy.Physics.sleepThreshold) {
    this.asleep = true;
  }
};

/** Force **/
KAPhy.Physics.Circle.prototype.applyForce = function(velChange) {
  this.vel = KAPhy.Physics.Vector2.add(this.vel, KAPhy.Physics.Vector2.div(velChange, this.mass));
};
KAPhy.Physics.Circle.prototype.moveTowards = function(target, force) {
  this.applyForce(KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(target, this.pos)), force));
};
KAPhy.Physics.Circle.prototype.moveFrom = function(target, force) {
  this.applyForce(KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.pos, target)), force));
};

/** Line collision **/
KAPhy.Physics.Circle.prototype.collideLine = function(line) {
  var pos = this.pos.canvasMap();
  var vel = this.vel.canvasMap();
  var one = line.one.canvasMap();
  var two = line.two.canvasMap();

  var prp = KAPhy.Physics.Vector2.sub(pos, vel);
  var pri = false;

  if (one.x === two.x ||
    one.y === two.y) {
    return;
  }

  if (!KAPhy.Physics.Collision.circleCollidingLine(one, two, pos, this.rad + line.rad)) {
    if (!KAPhy.Physics.Collision.intersecting(one, two, pos, prp)) {
      return;
    } else {
      pri = true;
    }
  }
  if (!KAPhy.Physics.Collision.intersecting(pos, KAPhy.Physics.Vector2.reflect(pos, one, two), one, two)) {
    var n = (KAPhy.Physics.Vector2.distSq(pos, one) < KAPhy.Physics.Vector2.distSq(pos, two)) ? one : two;
    this.vel =
      KAPhy.Physics.Vector2.mult(
        KAPhy.Physics.Vector2.sub(
          KAPhy.Physics.Vector2.reflect(
            KAPhy.Physics.Vector2.sub(prp, vel),
            n, prp),
          prp),
        line.bcf * this.bcf).canvasUnmap();
    this.pos =
      KAPhy.Physics.Vector2.sub(n,
        KAPhy.Physics.Vector2.mult(
          KAPhy.Physics.Vector2.normalize(
            KAPhy.Physics.Vector2.sub(n, prp)
          ),
          this.rad + line.rad + 0.5)
      ).canvasUnmap();
  } else {
    var n = KAPhy.Physics.Collision.intersection(prp, KAPhy.Physics.Vector2.reflect(prp, one, two), one, two);
    this.vel =
      KAPhy.Physics.Vector2.mult(
        KAPhy.Physics.Vector2.sub(n,
          KAPhy.Physics.Vector2.reflect(KAPhy.Physics.Vector2.sub(n, vel), n, KAPhy.Physics.Vector2.add(n, new KAPhy.Physics.Vector2(1, KAPhy.Physics.Equation.PM(one, two))))
        ), -line.bcf * this.bcf).canvasUnmap();
    this.pos =
      KAPhy.Physics.Vector2.add(n,
        KAPhy.Physics.Vector2.mult(
          KAPhy.Physics.Vector2.normalize(
            new KAPhy.Physics.Vector2(1,
              KAPhy.Physics.Equation.PM(one, two)
            )
          ),
          (this.rad + line.rad + 0.5) * (pos.y > n.y ? -1 : 1) * (one.x > two.x ? -1 : 1) * (one.y > two.y ? -1 : 1) * (pri ? -1 : 1))
      ).canvasUnmap();
  }
  this.trySleep();
};

/** Circle collision **/
KAPhy.Physics.Circle.prototype.collideStaticDynamic = function(that) {
  that.pos = KAPhy.Physics.Vector2.lerp(
    that.pos.canvasMap(),
    KAPhy.Physics.Vector2.add(this.pos.canvasMap(),
      KAPhy.Physics.Vector2.mult(
        KAPhy.Physics.Vector2.normalize(
          KAPhy.Physics.Vector2.sub(that.pos.canvasMap(), this.pos.canvasMap())
        ),
        this.rad + that.rad)
    ),
    KAPhy.Physics.circleAdjustment
  ).canvasUnmap();
  that.vel = KAPhy.Physics.Vector2.mult(
    KAPhy.Physics.Vector2.sub(
      KAPhy.Physics.Vector2.reflect(
        KAPhy.Physics.Vector2.sub(that.pos.canvasMap(), that.vel.canvasMap()),
        this.pos.canvasMap(), that.pos.canvasMap()),
      that.pos.canvasMap()),
    this.bcf * that.bcf).canvasUnmap();
  that.pos = KAPhy.Physics.Vector2.add(that.pos, that.vel);
};
KAPhy.Physics.Circle.prototype.collideDynamicStatic = function(that) {
  this.pos = KAPhy.Physics.Vector2.lerp(
    this.pos.canvasMap(),
    KAPhy.Physics.Vector2.add(that.pos.canvasMap(),
      KAPhy.Physics.Vector2.mult(
        KAPhy.Physics.Vector2.normalize(
          KAPhy.Physics.Vector2.sub(this.pos.canvasMap(), that.pos.canvasMap())
        ),
        this.rad + that.rad)
    ),
    KAPhy.Physics.circleAdjustment
  ).canvasUnmap();
  this.vel = KAPhy.Physics.Vector2.mult(
    KAPhy.Physics.Vector2.sub(
      KAPhy.Physics.Vector2.reflect(
        KAPhy.Physics.Vector2.sub(this.pos.canvasMap(), this.vel.canvasMap()),
        that.pos.canvasMap(), this.pos.canvasMap()),
      this.pos.canvasMap()),
    this.bcf * that.bcf).canvasUnmap();
  this.pos = KAPhy.Physics.Vector2.add(this.pos, this.vel);
};
KAPhy.Physics.Circle.prototype.collideDynamicDynamic = function(that) {
  var mid = KAPhy.Physics.Vector2.mid(this.pos, that.pos);
  var difference = KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.pos, that.pos));

  this.pos = KAPhy.Physics.Vector2.lerp(this.pos, KAPhy.Physics.Vector2.add(mid, KAPhy.Physics.Vector2.mult(difference, this.rad + that.rad)), KAPhy.Physics.circleAdjustment);
  that.pos = KAPhy.Physics.Vector2.lerp(that.pos, KAPhy.Physics.Vector2.sub(mid, KAPhy.Physics.Vector2.mult(difference, this.rad + that.rad)), KAPhy.Physics.circleAdjustment);

  var thisComponentOld = KAPhy.Physics.Vector2.dot(this.vel, difference);
  var thatComponentOld = KAPhy.Physics.Vector2.dot(that.vel, difference);

  var thisComponentNew = thatComponentOld * that.mass / this.mass;
  var thatComponentNew = thisComponentOld * this.mass / that.mass;

  this.vel.add(KAPhy.Physics.Vector2.mult(difference, (thisComponentNew - thisComponentOld) * this.bcf * that.bcf));
  that.vel.add(KAPhy.Physics.Vector2.mult(difference, (thatComponentNew - thatComponentOld) * this.bcf * that.bcf));
};
KAPhy.Physics.Circle.prototype.collideCircle = function(that) {
  if (this.fixed && that.fixed) {
    return;
  }
  if (KAPhy.Physics.Vector2.distSq(this.pos.canvasMap(), that.pos.canvasMap()) > ((this.rad + that.rad) * (this.rad + that.rad))) {
    return;
  }
  if (this.fixed) {
    this.collideStaticDynamic(that);
    return;
  }
  if (that.fixed) {
    this.collideDynamicStatic(that);
    return;
  }
  this.collideDynamicDynamic(that);
};
if (!KAPhy.Physics.Constraint) {
  KAPhy.Physics.Constraint = function(config) {
    this.one = config.one;
    this.two = config.two;

    this.rigidity = config.rigidity || config.rgd || 1 / 3;
    this.length = config.length || 100;

    this.one.constraints.push(this);
    this.two.constraints.push(this);
  };
  KAPhy.Physics.Constraint.prototype.springEffect = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    var difference = KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.one.pos.canvasMap(), this.two.pos.canvasMap())), this.rigidity * (distance / this.length - 1));

    this.one.applyForce(KAPhy.Physics.Vector2.mult(difference, -1).canvasUnmap());
    this.two.applyForce(difference.canvasUnmap());
  };
  KAPhy.Physics.Constraint.prototype.forceCompensate = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    var difference = KAPhy.Physics.Vector2.mult(KAPhy.Physics.Vector2.normalize(KAPhy.Physics.Vector2.sub(this.one.pos.canvasMap(), this.two.pos.canvasMap())), this.length / 2);
    var mid = KAPhy.Physics.Vector2.mid(this.one.pos.canvasMap(), this.two.pos.canvasMap());

    if (!this.one.fixed) {
      this.one.posAdjustments.push(KAPhy.Physics.Vector2.add(mid, difference).canvasUnmap());
    }

    if (!this.two.fixed) {
      this.two.posAdjustments.push(KAPhy.Physics.Vector2.sub(mid, difference).canvasUnmap());
    }
  };
  KAPhy.Physics.Constraint.prototype.draw = function() {
    KAPhy.Draw.line(this.one.pos.x, this.one.pos.y, this.two.pos.x, this.two.pos.y);
  };
  KAPhy.Physics.Constraint.prototype.display = function() {
    if (this.update) {
      this.update();
    }
    this.draw();
  };
}

KAPhy.Physics.Line = function(config) {
 this.one = config.one || new KAPhy.Physics.Vector2();
 this.two = config.two || new KAPhy.Physics.Vector2();

 this.one = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.one.x), KAPhy.Canvas.toPixels(this.one.y));
 this.two = new KAPhy.Physics.Vector2(KAPhy.Canvas.toPixels(this.two.x), KAPhy.Canvas.toPixels(this.two.y));

 /** Bounce Coefficient **/
 this.bcf = config.bcf || 0.75;

 /** Radius **/
 this.rad = config.rad || 4;
};
KAPhy.Physics.Line.prototype.draw = function() {
 var sw = KAPhy.Draw.getStrokeWeight();
 KAPhy.Draw.strokeWeight(this.rad * 2);
 KAPhy.Draw.line(this.one.x, this.one.y, this.two.x, this.two.y);
 KAPhy.Draw.strokeWeight(sw);
};
if(!KAPhy.Physics.Collision) {
  KAPhy.Physics.Collision = {
    intersection: function(a, b, c, d) {
      var X = (KAPhy.Physics.Equation.B(c, d) - KAPhy.Physics.Equation.B(a, b))/(KAPhy.Physics.Equation.M(a, b) - KAPhy.Physics.Equation.M(c, d));
      return new KAPhy.Physics.Vector2(X, KAPhy.Physics.Equation.M(a, b) * X + KAPhy.Physics.Equation.B(a, b));
    },
    intersecting: function(a, b, c, d) {
      var p = KAPhy.Physics.Collision.intersection(a, b, c, d);
      return (p.x >= Math.min(a.x, b.x) && p.x <= Math.max(a.x, b.x) && p.x >= Math.min(c.x, d.x) && p.x <= Math.max(c.x, d.x));
    },
    circleCollidingLine: function(a, b, c, r) {
      if(KAPhy.Physics.Vector2.magSq(KAPhy.Physics.Vector2.sub(a, c)) <= r * r || KAPhy.Physics.Vector2.magSq(KAPhy.Physics.Vector2.sub(b, c)) <= r * r) { return true; }
      var m = (KAPhy.Physics.Equation.B(a, b) - KAPhy.Physics.Equation.TB(KAPhy.Physics.Equation.PM(a, b), c))/(KAPhy.Physics.Equation.PM(a, b) - KAPhy.Physics.Equation.M(a, b));
      return m > Math.min(a.x, b.x) && m < Math.max(a.x, b.x) && KAPhy.Physics.Vector2.magSq(KAPhy.Physics.Vector2.sub(new KAPhy.Physics.Vector2(m, KAPhy.Physics.Equation.M(a, b) * m + KAPhy.Physics.Equation.B(a, b)), c)) < r * r;
    }
  };
}
/*
  This is just a simple KAPhy.Physics.Equation toolkit
  However, it has several important uses
  For example, it is useful when calculating reflections
  
  It finds simple things like slopes and y-intercepts
*/
if(!KAPhy.Physics.Equation) {
  KAPhy.Physics.Equation = {
    /*
     The M function finds the slope of a line.
     The line is defined by two points, a and b.
    */
    M: function(a, b) {
      return (a.y - b.y)/(a.x - b.x);
    },
    /*
      The B function finds the y-intercept of a line.
      The line is defined by two points, a and b.
    */
    B: function(a, b) {
     return  a.y - (a.y - b.y)/(a.x - b.x) * a.x;   
    },
    /*
      PM stands for "Perpendicular M"
      It finds the slope of any perpendicular of the line segment defined by a and b
    */
    PM: function(a, b) {
      return (b.x - a.x)/(a.y - b.y);
    },
    /*
      TB stands for "Through B"
      It finds the B value of a line with slope m that passes through point a
    */
    TB: function(m, a) {
      return a.y - m * a.x;
    }
  };
}

if (!KAPhy.Physics.Vector2) {
  KAPhy.Physics.Vector2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };
}
if (!KAPhy.Physics.Bungee) {
  KAPhy.Physics.Bungee = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Bungee.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Bungee.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos, this.two.pos);
    if (distance > this.length) {
      this.springEffect();
    }
  };
}

if (!KAPhy.Physics.Compressor) {
  KAPhy.Physics.Compressor = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Compressor.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Compressor.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos, this.two.pos);
    if (distance < this.length) {
      this.springEffect();
    }
  };
}

if (!KAPhy.Physics.Cord) {
  KAPhy.Physics.Cord = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Cord.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Cord.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.distSq(this.one.pos.canvasMap(), this.two.pos.canvasMap());
    if (distance > (this.length * this.length)) {
      this.springEffect();
      this.forceCompensate();
    }
  };
}

if (!KAPhy.Physics.Extender) {
  KAPhy.Physics.Extender = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Extender.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Extender.prototype.update = function() {
    var distance = KAPhy.Physics.Vector2.dist(this.one.pos, this.two.pos);
    if (distance < this.length) {
      this.springEffect();
      this.forceCompensate();
    }
  };
}

if(!KAPhy.Physics.Rod) {
  KAPhy.Physics.Rod = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Rod.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Rod.prototype.update = function() {
    this.springEffect();
    this.forceCompensate();
  };
}

if(!KAPhy.Physics.Spring) {
  KAPhy.Physics.Spring = function(config) {
    KAPhy.Physics.Constraint.call(this, config);
  };
  KAPhy.Physics.Spring.prototype = Object.create(KAPhy.Physics.Constraint.prototype);
  KAPhy.Physics.Spring.prototype.update = function() {
    this.springEffect();
  };
}

if(!KAPhy.Physics.Vector2.add) {
  KAPhy.Physics.Vector2.add = function(toAdd1, toAdd2) {
    return new KAPhy.Physics.Vector2(
      toAdd1.x + toAdd2.x,
      toAdd1.y + toAdd2.y
    );
  };
}
if(!KAPhy.Physics.Vector2.sub) {
  KAPhy.Physics.Vector2.sub = function(subtractFrom, toSubtract) {
    return new KAPhy.Physics.Vector2(
      subtractFrom.x - toSubtract.x,
      subtractFrom.y - toSubtract.y
    );
  };
}
if(!KAPhy.Physics.Vector2.mult) {
  KAPhy.Physics.Vector2.mult = function(toMultiply, scaleFactor) {
    return new KAPhy.Physics.Vector2(
      toMultiply.x * scaleFactor,
      toMultiply.y * scaleFactor
    );
  };
}
if(!KAPhy.Physics.Vector2.div) {
  KAPhy.Physics.Vector2.div = function(toDivide, inverseFactor) {
    return new KAPhy.Physics.Vector2(
      toDivide.x / inverseFactor,
      toDivide.y / inverseFactor
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.add) {
  KAPhy.Physics.Vector2.prototype.add = function(toAdd) {
    this.x += toAdd.x;
    this.y += toAdd.y;
  };
}
if(!KAPhy.Physics.Vector2.prototype.sub) {
  KAPhy.Physics.Vector2.prototype.sub = function(toSubtract) {
    this.x -= toSubtract.x;
    this.y -= toSubtract.y;
  };
}
if(!KAPhy.Physics.Vector2.prototype.mult) {
  KAPhy.Physics.Vector2.prototype.mult = function(scaleFactor) {
    this.x *= scaleFactor;
    this.y *= scaleFactor;
  };
}
if(!KAPhy.Physics.Vector2.prototype.div) {
  KAPhy.Physics.Vector2.prototype.div = function(inverseFactor) {
    this.x /= inverseFactor;
    this.y /= inverseFactor;
  };
}

if(!KAPhy.Physics.Vector2.canvasMap) {
  KAPhy.Physics.Vector2.canvasMap = function(toMap) {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toCanvasUnits(toMap.x),
      KAPhy.Canvas.toCanvasUnits(toMap.y)
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.canvasMap) {
  KAPhy.Physics.Vector2.prototype.canvasMap = function() {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toCanvasUnits(this.x),
      KAPhy.Canvas.toCanvasUnits(this.y)
    );
  };
}
if(!KAPhy.Physics.Vector2.canvasUnmap) {
  KAPhy.Physics.Vector2.canvasUnmap = function(toMap) {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toPixels(toMap.x),
      KAPhy.Canvas.toPixels(toMap.y)
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.canvasUnmap) {
  KAPhy.Physics.Vector2.prototype.canvasUnmap = function() {
    return new KAPhy.Physics.Vector2(
      KAPhy.Canvas.toPixels(this.x),
      KAPhy.Canvas.toPixels(this.y)
    );
  };
}
if(!KAPhy.Physics.Vector2.array) {
  KAPhy.Physics.Vector2.array = function(toConvert) {
    return [toConvert.x, toConvert.y];
  };
}
if(!KAPhy.Physics.Vector2.prototype.array) {
  KAPhy.Physics.Vector2.prototype.array = function() {
    return [this.x, this.y];
  };
}
if(!KAPhy.Physics.Vector2.prototype.get) {
  KAPhy.Physics.Vector2.prototype.get = function() {
    return new KAPhy.Physics.Vector2(this.x, this.y);
  };
}
if(!KAPhy.Physics.Vector2.prototype.set) {
  KAPhy.Physics.Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  };
}

if(!KAPhy.Physics.Vector2.rotate) {
  KAPhy.Physics.Vector2.rotate = function(toRotate, rotateBy) {
    var cosAngle = Math.cos(rotateBy);
    var sinAngle = Math.sin(rotateBy);
    return new KAPhy.Physics.Vector2(
      toRotate.x * cosAngle - toRotate.y * sinAngle,
      toRotate.x * sinAngle + toRotate.y * cosAngle
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.rotate) {
  KAPhy.Physics.Vector2.prototype.rotate = function(rotateBy) {
    var cosAngle = Math.cos(rotateBy);
    var sinAngle = Math.sin(rotateBy);
    var oldX = this.x;
    this.x = oldX * cosAngle - this.y * sinAngle;
    this.y = oldX * sinAngle + this.y * cosAngle;
  };
}

if(!KAPhy.Physics.Vector2.dot) {
  KAPhy.Physics.Vector2.dot = function(toDot1, toDot2) {
    return toDot1.x * toDot2.x + toDot1.y * toDot2.y;
  };
}
if(!KAPhy.Physics.Vector2.prototype.dot) {
  KAPhy.Physics.Vector2.prototype.dot = function(dotWith) {
    return this.x * dotWith.x + this.y * dotWith.y;
  };
}

if(!KAPhy.Physics.Vector2.mag) {
   KAPhy.Physics.Vector2.mag = function(toMeasure) {
    return Math.sqrt(toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y);
  };
}
if(!KAPhy.Physics.Vector2.magSq) {
  KAPhy.Physics.Vector2.magSq = function(toMeasure) {
    return toMeasure.x * toMeasure.x + toMeasure.y * toMeasure.y;
  };
}
if(!KAPhy.Physics.Vector2.normalize) {
  KAPhy.Physics.Vector2.normalize = function(toNormalize) {
    return KAPhy.Physics.Vector2.div(toNormalize, toNormalize.mag());
  };
}
if(!KAPhy.Physics.Vector2.dist) {
  KAPhy.Physics.Vector2.dist = function(lineEnd1, lineEnd2) {
    return KAPhy.Physics.Vector2.sub(lineEnd1, lineEnd2).mag();
  };
}
if(!KAPhy.Physics.Vector2.distSq) {
  KAPhy.Physics.Vector2.distSq = function(lineEnd1, lineEnd2) {
    return KAPhy.Physics.Vector2.magSq(KAPhy.Physics.Vector2.sub(lineEnd1, lineEnd2));
  };
}
if(!KAPhy.Physics.Vector2.mid) {
   KAPhy.Physics.Vector2.mid = function(lineEnd1, lineEnd2) {
    return new KAPhy.Physics.Vector2(
      lineEnd1.x / 2 + lineEnd2.x / 2,
      lineEnd1.y / 2 + lineEnd2.y / 2
    );
  };
}
if(!KAPhy.Physics.Vector2.lerp) {
   KAPhy.Physics.Vector2.lerp = function(lerpFrom, lerpTo, lerpStage) {
    return new KAPhy.Physics.Vector2(
      lerpFrom.x + (lerpTo.x - lerpFrom.x) * lerpStage,
      lerpFrom.y + (lerpTo.y - lerpFrom.y) * lerpStage
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.mag) { 
  KAPhy.Physics.Vector2.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
}
if(!KAPhy.Physics.Vector2.prototype.magSq) {
  KAPhy.Physics.Vector2.prototype.magSq = function() {
    return this.x * this.x + this.y * this.y;
  };
}
if(!KAPhy.Physics.Vector2.prototype.normalize) {
  KAPhy.Physics.Vector2.prototype.normalize = function() {
    this.div(this.mag());
  };
}
if(!KAPhy.Physics.Vector2.prototype.dist) {
  KAPhy.Physics.Vector2.prototype.dist = function(lineEnd) {
    return KAPhy.Physics.Vector2.sub(this, lineEnd).mag();
  };
}
if(!KAPhy.Physics.Vector2.prototype.distSq) {
  KAPhy.Physics.Vector2.prototype.distSq = function(lineEnd) {
    return KAPhy.Physics.Vector2.sub(this, lineEnd).magSq();
  };
}
if(!KAPhy.Physics.Vector2.prototype.mid) {
   KAPhy.Physics.Vector2.prototype.mid = function(lineEnd) {
    return new KAPhy.Physics.Vector2(
      this.x / 2 + lineEnd.x / 2,
      this.y / 2 + lineEnd.y / 2
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.lerp) {
   KAPhy.Physics.Vector2.prototype.lerp = function(lerpWith, lerpStage) {
    return new KAPhy.Physics.Vector2(
      this.x + (lerpWith.x - this.x) * lerpStage,
      this.y + (lerpWith.y - this.y) * lerpStage
    );
  };
}

if(!KAPhy.Physics.Vector2.reflect) {
  KAPhy.Physics.Vector2.reflect = function(toReflect, linePoint1, linePoint2) {
    return KAPhy.Physics.Vector2.sub(toReflect,
      KAPhy.Physics.Vector2.mult(
        KAPhy.Physics.Vector2.sub(toReflect, new KAPhy.Physics.Vector2(
          (KAPhy.Physics.Equation.B(linePoint1, linePoint2) - KAPhy.Physics.Equation.TB(KAPhy.Physics.Equation.PM(linePoint1, linePoint2), toReflect)) /
          (KAPhy.Physics.Equation.PM(linePoint1, linePoint2) - KAPhy.Physics.Equation.M(linePoint1, linePoint2)), KAPhy.Physics.Equation.M(linePoint1, linePoint2) *
          (KAPhy.Physics.Equation.B(linePoint1, linePoint2) - KAPhy.Physics.Equation.TB(KAPhy.Physics.Equation.PM(linePoint1, linePoint2), toReflect)) /
          (KAPhy.Physics.Equation.PM(linePoint1, linePoint2) - KAPhy.Physics.Equation.M(linePoint1, linePoint2)) + KAPhy.Physics.Equation.B(linePoint1, linePoint2)
        )),
      2)
    );
  };
}
if(!KAPhy.Physics.Vector2.prototype.reflect) {
  KAPhy.Physics.Vector2.prototype.reflect = function(linePoint1, linePoint2) {
    return KAPhy.Physics.Vector2.sub(this,
      KAPhy.Physics.Vector2.mult(
        KAPhy.Physics.Vector2.sub(this, new KAPhy.Physics.Vector2(
          (KAPhy.Physics.Equation.B(linePoint1, linePoint2) - KAPhy.Physics.Equation.TB(KAPhy.Physics.Equation.PM(linePoint1, linePoint2), this)) /
          (KAPhy.Physics.Equation.PM(linePoint1, linePoint2) - KAPhy.Physics.Equation.M(linePoint1, linePoint2)), KAPhy.Physics.Equation.M(linePoint1, linePoint2) *
          (KAPhy.Physics.Equation.B(linePoint1, linePoint2) - KAPhy.Physics.Equation.TB(KAPhy.Physics.Equation.PM(linePoint1, linePoint2), this)) /
          (KAPhy.Physics.Equation.PM(linePoint1, linePoint2) - KAPhy.Physics.Equation.M(linePoint1, linePoint2)) + KAPhy.Physics.Equation.B(linePoint1, linePoint2)
        )),
      2)
    );
  };
}
