let letterCount = 0;
let tries = 0;
let word = "";
const rows = document.querySelectorAll(".row");
document
  .querySelector("body")
  .addEventListener("keyup", event => {
    const inputs = rows[tries].querySelectorAll(".input");
    const letter = event.key;
    if (isLetter(letter)) {
      word += letter;
      inputs[letterCount].innerHTML = letter.toUpperCase();
      letterCount++;
      if (letterCount === 5) {
        /*listen for enter*/
        tries++;
        letterCount = 0;
      }
      if (tries == 6) {
        losingScreen();
      }
   }
  });
  const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
  }
  const losingScreen = () => {
    alert("lost");
  }