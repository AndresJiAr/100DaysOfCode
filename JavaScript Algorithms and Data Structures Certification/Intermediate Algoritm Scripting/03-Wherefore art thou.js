function whatIsInAName(collection, source) {
    var arr = []
    // Only change code below this line
  collection.forEach(item => {
    let countProps = 0;
    let countEqualProps = 0;
    for(let key in source){
      countProps++;
      if(item[key] && item[key] === source[key]){
        countEqualProps++;
      }
    }
  
  if(countEqualProps === countProps){
    arr.push(item);
  }
  });
    // Only change code above this line
    return arr;
  }
  
  console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));



  whatIsInAName(arg1, arg2)
  const arg1 = [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]
  const arg2 = { last: "Capulet" }


  function afodmkv(arg1, arg2) {

    const [key, value] = Object.entries(arg2);
    console.log({key, value})
    return arg1.reduce((acc, item) => {

      if(item[])

    }, {})

  }