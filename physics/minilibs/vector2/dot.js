if(!Vector2.dot) {
  Vector2.dot = function(toDot1, toDot2) {
    return toDot1.x * toDot2.x + toDot1.y * toDot2.y;
  };
}
if(!Vector2.prototype.dot) {
  Vector2.prototype.dot = function(dotWith) {
    return this.x * dotWith.x + this.y * dotWith.y;
  };
}
