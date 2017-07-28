if(!loaded) {
  var loaded = true;
  for(var i in Images) {
    var oldVal = Images[i];
    Images[i] = new Image();
    Images[i].src = oldVal;
  }
}
