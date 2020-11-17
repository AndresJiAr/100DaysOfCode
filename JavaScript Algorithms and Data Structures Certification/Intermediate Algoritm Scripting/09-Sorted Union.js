function uniteUnique(...arr) {
    return arr.reduce((acc, innerArr) => {
      innerArr.forEach(item => {
        if(!acc.includes(item)){
          acc.push(item);
        }
      });
      return acc;
    });
  }
  
  console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));