function spinalCase(str) {

    let camelCaseHandled = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    let spacesAndDashedHandled = camelCaseHandled.replace (/\s|_/g, "-")
    
      return spacesAndDashedHandled.toLowerCase();
    }
    
    let result = spinalCase('TheAndyGriffith_Show');
    console.log(result);