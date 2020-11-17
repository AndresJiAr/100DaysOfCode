function fearNotLetter(str) {
    var letters = "abcdefghijklmnopqrstuvwxyz";
    letters = letters.split("");
    str = str.split("");
    
      if(str === letters){
        return undefined;
    }
    for (var i = 0; i<str.length; i++){
      if (str[i]!=letters[i]){
        return letters[i];
      }
    }
      return str;
    }
    
    console.log(fearNotLetter("stvwx"));
    