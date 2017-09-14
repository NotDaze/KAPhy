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