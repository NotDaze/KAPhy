if(!Animate || KAPhy.version !== KAPhy.current) {
  var Animate = {
    transitions: {
      linear: function(x) { return x; },
      easeOutSine: function(x) { return Math.sin(x * Math.PI/2); },
      easeInSine: function(x) { return -Math.sin((x + 1) * Math.PI/2) + 1; },
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
      easeOutQuint: function(x) { return (--x) * x * x * x * x + 1; },
      easeInOutQuint: function(x) { return x < 0.5 ? (16 * x * x * x * x * x) : (16 * (--x) * x * x * x * x + 1); },
    }
  };
}
