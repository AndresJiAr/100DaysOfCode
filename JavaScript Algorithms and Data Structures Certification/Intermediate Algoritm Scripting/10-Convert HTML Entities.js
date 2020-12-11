function convertHTML(str) {
    // &colon;&rpar;
    const convertHTML={ "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        "\"": "&quot;",
                        "'": "&apos;"}
    return str.split("").map(letter => { return [
          letter.match(/[&<>"']/) ? convertHTML[letter] : letter]
        }).join("");
  }
  
  convertHTML("Dolce & Gabbana"); // Dolce &​amp; Gabbana
  convertHTML("Hamburgers < Pizza < Tacos"); // Hamburgers &​lt; Pizza &​lt; Tacos
  convertHTML("Sixty > twelve"); // Sixty &​gt; twelve
  convertHTML('Stuff in "quotation marks"'); // Stuff in &​quot;quotation marks&​quot;
  convertHTML("Schindler's List"); // Schindler&​apos;s List
  convertHTML("<>"); // &​lt;&​gt;
  convertHTML("abc"); // abc
  