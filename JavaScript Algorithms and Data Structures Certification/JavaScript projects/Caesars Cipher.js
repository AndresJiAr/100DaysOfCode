function rot13(str) {

    return str.replace(/[A-Z]/g, (letter) =>{
      let value = letter.charCodeAt(0) + 13;    //value of the letters + 13
  
      if(value > 90) {
        value = value % 90 + 64;
      }
      console.log(value);
      return String.fromCharCode(value)
    });
  }
  
  console.log(rot13("SERR PBQR PNZC"));


  
