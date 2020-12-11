function diffArray(arr1, arr2) {
    var newArr = [];
  
    arr1.forEach(item => {
      if(arr2.indexOf(item) === -1){
        newArr.push(item);
      }
    });
  
    arr2.forEach(item => {
      if(arr1.indexOf(item) === -1){
        newArr.push(item);
    }
    });
    return newArr;
  }
  console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]))