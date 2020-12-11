function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
  
    let orbitalPeriodResults= [];
    
    arr.forEach(function(dataPoint) {
      let translatedDataPoint = {};
      let twoTimesPi = Math.PI * 2;
      let earthRadiusPlusAvgAlt = earthRadius + dataPoint.avgAlt;
      let rCubed = Math.pow(earthRadiusPlusAvgAlt, 3);
      let sqrt = Math.sqrt(rCubed/GM);
      translatedDataPoint.name = dataPoint.name;
      orbitalPeriodResults.push(translatedDataPoint)
       
       let T = Math.round(twoTimesPi*sqrt)
       translatedDataPoint.orbitalPeriod = T; 
    });
    
    return orbitalPeriodResults;
  }  
    orbitalPeriod([
       {name: "iss", avgAlt: 413.6},
       {name: "hubble", avgAlt: 556.7}, 
       {name: "moon", avgAlt: 378632.553}
    ]);
  
  console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));
  //radius
  //avgAltitude
  //T
  // T = 2 * PI * Math.sqrt(a*a*a/gm)