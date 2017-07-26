/*
  This is just a simple Equation toolkit
  However, it has several important uses
  For example, it is useful when calculating reflections
  
  It finds simple things like slopes and y-intercepts
*/
var Equation = {
  M: function(a, b) {
    return (a.y - b.y)/(a.x - b.x);
  },
  B: function(a, b) {
    return  a.y - (a.y - b.y)/(a.x - b.x) * a.x;   
  },
  PM: function(a, b) {
    return (b.x - a.x)/(a.y - b.y);
  },
  TB: function(m, a) {
    return a.y - (m * a.x);
  }
};
