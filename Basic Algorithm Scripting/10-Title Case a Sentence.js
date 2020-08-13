function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
  }
  
  
  console.log(titleCase("I'm a little tea pot"));
  
/*(function titleCase(str) {
  let result = "";
  let words = str.split(" ")

for (let i = 0; i < words.length; i+= 1) {
      let word = words[i];

    for (let j = 0; j < words.lenth; j += 1){
          if (j === 0) {
              result += word[j].toUpperCase();
          } else {
              result += word[j].toLowerCase();
            }
    }
    if (words.length -1 !==i){
        result += " ";
    }
}
return result;
  })*/