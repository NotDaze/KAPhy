
if(!intersection) {
  var intersection = function(a, b, c, d) {
    var X = (Equation.B(c, d) - Equation.B(a, b))/(Equation.M(a, b) - Equation.M(c, d));
    return [X, Equation.M(a, b) * X + Equation.B(a, b)];
  };
}
if(!intersecting) {
  var intersecting = function(a, b, c, d) {
    var p = intersection(a, b, c, d);
    return (p.x >= Math.min(a.x, b.x) && p.x <= Math.max(a.x, b.x) && p.x >= Math.min(c.x, d.x) && p.x <= Math.max(c.x, d.x));
  };
}
if(!circleCollidingLine) {
  var circleCollidingLine = function(a, b, c, r) {
    if(Vector2.magSq(a.sub(c)) <= r * r || Vector2.magSq(b.sub(c)) <= r * r) { return true; }
    var m = (Equation.B(a, b) - Equation.TB(PM(a, b), c))/(Equation.PM(a, b) - Equation.M(a, b));
    return m > Math.min(a.x, b.x) && m < Math.max(a.x, b.x) && Vector2d.magSq(Vector2.sub(new Vector2(m, Equation.M(a, b) * m + Equation.B(a, b)), c)) < r * r;
  };
}

