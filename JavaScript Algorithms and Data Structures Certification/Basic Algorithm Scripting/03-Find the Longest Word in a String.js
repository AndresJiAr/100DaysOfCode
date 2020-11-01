function findLongestWordLength(str) {
    let arr = str.split(" ");
    let maxLength = 0;
   
     for (let i = 0; i < arr.length; i++) {
      if (arr[i].length > maxLength) {
        maxLength = arr[i].length;
      } 
     }
     return maxLength;
   }
   
   console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));
   
   
   
   