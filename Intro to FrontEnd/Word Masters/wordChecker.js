let letterCount = 0;
let tries = 0;
let word = "";
const rows = document.querySelectorAll(".row");
document
  .querySelector("body")
  .addEventListener("keyup", event => {
    const inputs = rows[tries].querySelectorAll(".input");
    const letter = event.key;
    if (letter === "Enter" && letterCount === 5) {
      console.log("Enter");
      letterCount = 0;
      tries++;
      if (tries == 6) {
        losingScreen();
      }
    } else if (letterCount < 5) {
      if (isLetter(letter)) {
        word += letter;
        inputs[letterCount].innerHTML = letter.toUpperCase();
        letterCount++; 
      }
    }
  });
  const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
  }
  const losingScreen = () => {
    alert("lost");
  }
  const isWord = (word) => {
    return true;
  }