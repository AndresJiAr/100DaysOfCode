function sumPrimes(num) {
    let sum = 0;
  
    for(let i=2; i<=num; i++){
      if(isPrime(i)){
        sum += i;
      }
    }
    return sum;
  }
  
  function isPrime(num){
  for(let i = 2; i<=num/2; i++){
    if(num % i === 0){
      return false;
    }
  }
  return true;
  }
  
  
  console.log(sumPrimes(10));
  