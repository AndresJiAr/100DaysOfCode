function countOnline(usersObj) {
    // Only change code below this line
  let result = 0;
    for (let name in users) {
      if (users[name].online === true) {
        result++;
      }
    }
    return result;
  
    // Only change code above this line
  }
  