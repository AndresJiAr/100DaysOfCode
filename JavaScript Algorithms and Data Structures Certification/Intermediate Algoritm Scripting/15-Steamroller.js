function steamrollArray(arr) {
    const finalArr = [];
    
    arr.forEach(item => {
      if(Array.isArray(item)){
        finalArr.push(...steamrollArray(item))
      }else{
        finalArr.push(item);
      }
    });
      return finalArr;
     } 
    
    console.log(steamrollArray([1, [2], [3, [[4]]]]));