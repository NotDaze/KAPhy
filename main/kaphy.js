if (!KAPhy) {
  var KAPhy = {
    current: "0.0.5",
    install: function() {
      KAPhy.version = window.localStorage.getItem("kaphyversion");
      
      if(!KAPhy.localStorageUsable()) {
        console.log("KAPhy is updating or installing.");
        return;
      }
      if (KAPhy.version !== KAPhy.current) {
        console.log("KAPhy is updating or installing.");
      }
    },
    finishUpdate: function() {
      if (KAPhy.version !== KAPhy.current) {
        KAPhy.version = KAPhy.current;
        window.localStorage.setItem("kaphyversion", KAPhy.current);
        console.log("KAPhy update finished!");
      }
      console.log("KAPhy loaded!");
    },
    localStorageUsable: function() {
      try {
        var storage = window.localStorage,
        x = '__local_storage_test_this_will_be_overridden_do_not_use_sincerely_temporalfuzz__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      }
      catch(e) { return false; }
    }
  };
}
KAPhy.install();
