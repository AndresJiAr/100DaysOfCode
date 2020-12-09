function sumFibs(num) {
    var  n = 0, nPlusOne = 1, temp;
    var sum = 0;
  
    while (n <= num){
      temp = n;
      n = n + nPlusOne; 
      nPlusOne = temp;
  
      if (nPlusOne % 2 !== 0) {
            sum += nPlusOne;
      }
  
    }
  
    return sum;
  }
  
  sumFibs(4000000);
  