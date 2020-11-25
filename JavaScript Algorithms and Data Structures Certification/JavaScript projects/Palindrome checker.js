function palindrome(str) {
    const newStr = str.replace(/[_\W]/g, "");
  
    return isPalindrome(newStr);
  }
  
  function isPalindrome(str) {
    return str.toLowerCase() === str.toLowerCase().split("").reverse().join("");
  }
  
  
  console.log(palindrome("race car"));