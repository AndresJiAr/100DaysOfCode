const pairs = {
    A:"T", T:"A", C:"G", G:"C"
  }
  
  function pairElement(str) {
    return str.split("").map(item => ([item, pairs[item]]));
  }
  
  console.log(pairElement("CTCTA"));
  