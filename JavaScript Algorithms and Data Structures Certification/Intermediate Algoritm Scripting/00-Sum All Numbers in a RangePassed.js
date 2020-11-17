function sumAll(arr) {
    //Taking values from the end of the array
    let minimumNumber = Math.min(arr[0], arr[1]);
    let maximumNumber = Math.max(arr[0], arr[1]);
    let result = 0; 
  
  
  for (let i = minimumNumber; i <= maximumNumber; i+=1){
    result += i;
  }
  console.log(result)
    return result;
  }
  
  sumAll([1, 3]);