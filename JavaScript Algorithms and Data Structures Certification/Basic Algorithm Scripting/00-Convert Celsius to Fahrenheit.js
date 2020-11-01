function convertToF(celsius) {
    let fahrenheit = celsius * (9 / 5) + 32;
   if (typeof fahrenheit !== "undefined") {
      return fahrenheit;
    } else {
      return "fahrenheit not defined";
    }
  }
  
  convertToF(30);