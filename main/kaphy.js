if (!KAPhy) {
  var KAPhy = {
    current: "0.0.5",
    install: function() {
      if (KAPhy.version !== KAPhy.current) {
        console.log("KAPhy is updating, installing, or rebuilding.");
      }
    },
    finishUpdate: function() {
      if (KAPhy.version !== KAPhy.current) {
        KAPhy.version = KAPhy.current;
        console.log("KAPhy build finished!");
      }
      console.log("KAPhy loaded!");
    },
  };
}
KAPhy.install();
