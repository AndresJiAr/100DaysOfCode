function truthCheck(collection, pre) {
    for(let i = 0; i<collection.length; i++){
      const item = collection[i];
      if(!item.hasOwnProperty(pre)|| !item[pre]){
        return false
      }
    }
    
      return true;
    }
    
    console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));
    