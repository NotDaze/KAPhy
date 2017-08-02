if(!Vector2.reflect) {
  Vector2.reflect = function(toReflect, linePoint1, linePoint2) {
    return Vector2.sub(toReflect,
      Vector2.mult(
        Vector2.sub(toReflect, new Vector2(
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), toReflect)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)), Equation.M(linePoint1, linePoint2) *
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), toReflect)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)) + Equation.B(linePoint1, linePoint2)
        )),
      2)
    );
  };
}
if(!Vector2.prototype.reflect) {
  Vector2.prototype.reflect = function(linePoint1, linePoint2) {
    return Vector2.sub(this,
      Vector2.mult(
        Vector2.sub(this, new Vector2(
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), this)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)), Equation.M(linePoint1, linePoint2) *
          (Equation.B(linePoint1, linePoint2) - Equation.TB(Equation.PM(linePoint1, linePoint2), this)) /
          (Equation.PM(linePoint1, linePoint2) - Equation.M(linePoint1, linePoint2)) + Equation.B(linePoint1, linePoint2)
        )),
      2)
    );
  };
}
