var KAPhy = {
  current: "0.0.4",
  install: function() {
    if(!KAPhy.installed) {
      KAPhy.installed = true;
      KAPhy.version = KAPhy.current;
    }
    else if(KAPhy.version !== KAPhy.current){
      console.log("KAPhy is updating.");
    }
  },
  finishUpdate: function() {
    KAPhy.version = KAPhy.current;
    console.log("KAPhy update finished!");
  }
};
KAPhy.install();
