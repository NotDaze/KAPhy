if(!KAPhy.Interface.updateSet) {
  KAPhy.Interface.updateSet = function(set) {
    for(var i = set.length - 1; i >= 0; i--) {
      set[i].display();
    }
    for(var i = 0; i < set.length; i++) {
      if(set[i] === KAPhy.Interface.selected) {
        set.push(set.splice(i, 1)[0]);
        return;
      }
    }
  };
}