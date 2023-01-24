let letterCount = 0;
let tries = 0;
let word = "";
const wordLength = 5;
const totalTries = 6;
const rows = document.querySelectorAll(".row");
const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";
const WORD_OF_DAY_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
const loader = document.querySelector(".loader");

let wordOfTheDay = "";
getWord().then(function (word) {
  wordOfTheDay = word;
  /*console.log(wordOfTheDay);*/
});
async function getWord() {
  const promise = await fetch(WORD_OF_DAY_URL);
  const wordObject = await promise.json();
  let word = wordObject.word
  return word;
}
document
  .querySelector("body")
  .addEventListener("keyup", event => {
    const inputs = rows[tries].querySelectorAll(".input");
    const character = event.key;
    if (character === "Backspace") {
      removeLetter(inputs);
    } else if (character === "Enter" && letterCount === wordLength) {
      checkWord(word, inputs);
    } else if (letterCount < wordLength) {
      if (isLetter(character)) {
        inputLetter(character, inputs);
      }
    }
  });
function removeLetter(inputs) {
  if (letterCount > 0) {
    word = word.slice(0, -1);
    letterCount--;
    inputs[letterCount].innerHTML = "";
  }
}
function inputLetter(letter, inputs) {
  word += letter;
  inputs[letterCount].innerHTML = letter.toUpperCase();
  letterCount++; 
}
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
function losingScreen() {
  alert("You lost, word was " + wordOfTheDay);
}
function checkWord(word, inputs) {
  const wordObject = {
    word: word
  }
  isWord(wordObject).then(function (isWordResult) {
    const boxes = document.getElementsByClassName("row").item(tries).getElementsByClassName("input");
    if (isWordResult) {
      for (let i = 0; i < boxes.length; i++) {
        boxes.item(i).classList.remove("not-valid-word");
      }
      compareWord(word, inputs);
      submitWord();
    } else {
      for (let i = 0; i < boxes.length; i++) {
        boxes.item(i).classList.add("not-valid-word");
      }
    }
  })
}
function submitWord() {
  letterCount = 0;
  tries++;
  word = "";
  if (tries === totalTries) {
    losingScreen();
  }
} 
async function isWord(wordObject) {
  displayLoader();
  const promise = await fetch(VALIDATE_WORD_URL, {
    method: "POST",
    body: JSON.stringify(wordObject)
  })
  const validationJson = await promise.json();
  hideLoader();
  return validationJson.validWord;
}
function compareWord(word, inputs) {
  let matchedIndices = [];
  for (let i = 0; i < wordLength; i++) {
    if (word[i] === wordOfTheDay[i]) {
      document.getElementsByClassName("row").item(tries).getElementsByClassName("input").item(i).classList.add("match-letter");
      matchedIndices.push(i);
    } else {
      document.getElementsByClassName("row").item(tries).getElementsByClassName("input").item(i).classList.add("mismatch-letter");
    }
  }
  let unmatchedWord = "";
  for (let i = 0; i < wordLength; i++) {
    if (!matchedIndices.includes(i)) {
      unmatchedWord += wordOfTheDay[i];
    }
  }
  for (let i = 0; i < wordLength; i++) {
    if (!matchedIndices.includes(i) && unmatchedWord.includes(word[i])) {
      document.getElementsByClassName("row").item(tries).getElementsByClassName("input").item(i).classList.add("includes-letter");
    } 
  }
  if (word === wordOfTheDay) {
    alert("You win!");
    win();
  }
}
function win() {
  const title = document.querySelector(".header");
  title.classList.add("rainbow");
}
function displayLoader() {
  loader.classList.add("display");
}
function hideLoader() {
  loader.classList.remove("display");
}
