var KAPhy = {
  current: "0.0.4.11",
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
    if(KAPhy.version !== KAPhy.current) {
      KAPhy.version = KAPhy.current;
      console.log("KAPhy update finished!");
    }
    console.log("KAPhy loaded!");
  }
};
KAPhy.install();
