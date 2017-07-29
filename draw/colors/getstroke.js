if(!Draw.getStroke || KAPhy.version !== KAPhy.current) {
  Draw.getStroke = function() {
    if(!Canvas.configured) {
      console.warn("KAPhy Warning - You must use Canvas.configure(); before you can draw!");
      return;
    }
    
    var hexDigitDec = function(digit) {
      switch(digit.toString().toLowerCase()) {
        case "0": return 0; break;
        case "1": return 1; break;
        case "2": return 2; break;
        case "3": return 3; break;
        case "4": return 4; break;
        case "5": return 5; break;
        case "6": return 6; break;
        case "7": return 7; break;
        case "8": return 8; break;
        case "9": return 9; break;
        case "a": return 10; break;
        case "b": return 11; break;
        case "c": return 12; break;
        case "d": return 13; break;
        case "e": return 14; break;
        case "f": return 15; break;
      }
    };//Converts a hex digit to a decimal number
    
    var strokeStyle = Canvas.context.strokeStyle;
    if(strokeStyle[0] === "#") {
      return {
        r: 16 * hexDigitDec(strokeStyle[1]) + hexDigitDec(strokeStyle[2]),
        g: 16 * hexDigitDec(strokeStyle[3]) + hexDigitDec(strokeStyle[4]),
        b: 16 * hexDigitDec(strokeStyle[5]) + hexDigitDec(strokeStyle[6]),
        a: 255
      };
    }
    else {
      strokeStyle[0] = strokeStyle[0].split("");
      strokeStyle[0].splice(0, 5);
      strokeStyle[0] = parseFloat(strokeStyle[0].join(""));
      strokeStyle[1] = parseFloat(strokeStyle[1]);
      strokeStyle[2] = parseFloat(strokeStyle[2]);
      strokeStyle[3] = strokeStyle[3].split("");
      strokeStyle[3].pop();
      strokeStyle[3] = parseFloat(strokeStyle[3].join(""));
      
      return {
        r: strokeStyle[0],
        g: strokeStyle[1], 
        b: strokeStyle[2],
        a: strokeStyle[3] * 255
      };
    }
  };
}
