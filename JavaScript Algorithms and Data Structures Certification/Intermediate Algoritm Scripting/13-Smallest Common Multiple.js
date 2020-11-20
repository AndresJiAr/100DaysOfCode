function smallestCommons(arr) {
    if(arr[0] > arr[1]){
      const temp = arr[1];
      arr[1] = arr[0]
      arr[0] = temp;
    }
  const newArr = [];
  for(let i = arr[0]; i<=arr[1]; i++){
    newArr.push(i);
  }
  
  const prod = newArr.reduce((acc, nr) => acc *=nr, 1);
  
  for(let i=1; i<=prod; i++){
    const len = newArr.filter(nr => i % nr === 0).length;
    if(len === newArr.length){
      return i;
    }
  }
  
    return prod;
  }
  
  
  console.log(smallestCommons([1,5]));