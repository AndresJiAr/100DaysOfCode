function dropElements(arr, func) {
    const index = arr.findIndex(func);
    console.log(index)
    //Drop them elements
    return index === -1 ? [] : arr.slice(index);
  }
  
  console.log(dropElements([1, 2, 3, 4], function(n) {return n >= 3;}));