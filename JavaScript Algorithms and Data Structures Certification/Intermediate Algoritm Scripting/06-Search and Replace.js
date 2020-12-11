
    function myReplace(str, before, after) {
      var afterString = after;
      if (before.charCodeAt(0) <= 90 && before.charCodeAt(0) >= 65) {
        afterString = after.split("").map(function(letter, index) {
          if (index === 0) {
            return letter.toUpperCase();
          }
          return letter;
        }).join("");
      } else if (before.charCodeAt(0) <= 122 && before.charCodeAt(0) >= 97) {
        afterString = after.split("").map(function(letter, index) {
          if (index === 0) {
            return letter.toLowerCase();
          }
          return letter;
        }).join("");
      }
      var newStr = str.replace(new RegExp(before, 'g'), afterString);
      return newStr;
    }
    myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");