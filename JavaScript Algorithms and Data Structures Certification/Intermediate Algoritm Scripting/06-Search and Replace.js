function myReplace(str, before, after) {
    if (before[0].toLowerCase() !== before[0]) {
      after = after[0].toUpperCase() + after.slice(1);
    }
    
      return str.replace(before, after);
    }
    
    console.log(myReplace("I think we should look up there", "up", "Down"));
    