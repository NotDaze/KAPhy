/*
  This is just a simple Equation toolkit
  However, it has several important uses
  For example, it is useful when calculating reflections
  
  It finds simple things like slopes and y-intercepts
*/
if(!Equation) {
  var Equation = {
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
