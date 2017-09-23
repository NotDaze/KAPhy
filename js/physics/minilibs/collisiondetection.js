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