function telephoneCheck(str) {
    const regex = /^(1 |1)*(\d{3}|\(\d{3}\))[ -]{0,1}(\d{3})[ -]{0,1}(\d{4}$)/g;
    return regex.test(str);
  }
  
  console.log(telephoneCheck("1 555 555 5555"));
  
  
  
  // 4 digits in the end
  //3 digits separated by a space or a dash 
  //a space or dash
  //parentheses with 3 digits 
  //One digit+space in the beguinnig (sometimes)