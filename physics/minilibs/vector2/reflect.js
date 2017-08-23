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
