if(!Draw.getFill) {
  Draw.getFill = function() {
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
    
    var fillStyle = Canvas.context.fillStyle;
    if(fillStyle[0] === "#") {
      return {
        r: 16 * hexDigitDec(fillStyle[1]) + hexDigitDec(fillStyle[2]),
        g: 16 * hexDigitDec(fillStyle[3]) + hexDigitDec(fillStyle[4]),
        b: 16 * hexDigitDec(fillStyle[5]) + hexDigitDec(fillStyle[6]),
        a: 255
      };
    }
    else {
      fillStyle[0] = fillStyle[0].split("");
      fillStyle[0].splice(0, 5);
      fillStyle[0] = parseFloat(fillStyle[0].join(""));
      fillStyle[1] = parseFloat(fillStyle[1]);
      fillStyle[2] = parseFloat(fillStyle[2]);
      fillStyle[3] = fillStyle[3].split("");
      fillStyle[3].pop();
      fillStyle[3] = parseFloat(fillStyle[3].join(""));
      
      return {
        r: fillStyle[0],
        g: fillStyle[1], 
        b: fillStyle[2],
        a: fillStyle[3] * 255
      };
    }
  };
}
