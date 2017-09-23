if(!KAPhy.ImportKA) {
  KAPhy.ImportKA = function(id, onLoad) {
    function read(raw) {
      var data = JSON.parse(raw.revision.code);
      onLoad(data);
    }
    
    var jsonReader = document.createElement("script");
    jsonReader.setAttribute("src","https://www.khanacademy.org/api/labs/scratchpads/" + id + "?callback=read&\x5f=" + Date.now());
    document.body.appendChild(jsonReader);
  };
}