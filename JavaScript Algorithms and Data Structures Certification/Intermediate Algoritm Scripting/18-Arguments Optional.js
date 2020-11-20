function addTogether(a, b) {
    if(b === undefined){
      if(!Number.isInteger(a)){
        return undefined;
      }
      return function(x){
        if(!Number.isInteger(x)){
          return undefined;
        }
        return a + x;
      }
    }else {
      if(!Number.isInteger(a) || !Number.isInteger(b)){
        return undefined;
      }
      return a + b;
    }
    
  }
  
  console.log(addTogether("http://bit.ly/IqT6zt"));