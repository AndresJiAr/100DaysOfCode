function translatePigLatin(str) {
    const regex = /^([^aeiou]+)(.*)/; //RegularExpresion
    if(regex.test(str)){
      str = str.replace(regex, '$2$1ay')
    }
    else{
      str += "way";
    }
    
    return str;
  }
  
  translatePigLatin("consonant");
  
  //onsonantcay
  
  //Andres => Andresway
  