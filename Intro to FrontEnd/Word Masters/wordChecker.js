let letterCount = 0;
let tries = 0;
let word = "";
let done = false;
let isLoading = false;
const WORD_LENGTH = 5;
const TOTAL_TRIES = 6;
const rows = document.querySelectorAll(".row");
const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";
const WORD_OF_DAY_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
const loader = document.querySelector(".loader");


let wordOfTheDay = "";
getWord().then(function (word) {
  wordOfTheDay = word;
  hideLoader();
  isLoading = false;
  console.log(wordOfTheDay);
});
async function getWord() {
  displayLoader();
  isLoading = true;
  const promise = await fetch(WORD_OF_DAY_URL);
  const wordObject = await promise.json();
  let word = wordObject.word
  return word;
}
document
  .querySelector("body")
  .addEventListener("keyup", event => {
    if (done || isLoading) {
      return;
    }
    const inputs = rows[tries].querySelectorAll(".input");
    const character = event.key;
    if (character === "Backspace") {
      removeLetter(inputs);
    } else if (character === "Enter" && letterCount === WORD_LENGTH) {
      checkWord(word, inputs);
    } else if (letterCount < WORD_LENGTH) {
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
  done = true;
}
function checkWord(word, inputs) {
  const wordObject = {
    word: word
  }
  isWord(wordObject).then(function (isWordResult) {
    if (isWordResult) {
      compareWord(word, inputs);
      submitWord();
    } else {
      const boxes = document.getElementsByClassName("row").item(tries).getElementsByClassName("input");
      showNotValid(boxes);
      resetNotValid(boxes);
    }
  })
}
function showNotValid(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    boxes.item(i).classList.add("not-valid-word");
  }
}
function resetNotValid(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    boxes.item(i).onanimationend = () => {
      boxes.item(i).classList.remove("not-valid-word");
    }
  }
}
function submitWord() {
  if (word === wordOfTheDay) {
    winningScreen();
  } else if (tries === TOTAL_TRIES) {
    losingScreen();
  }
  letterCount = 0;
  tries++;
  word = "";
} 
function winningScreen() {
  alert("You win!");
  win();
  done = true;
}
async function isWord(wordObject) {
  displayLoader();
  isLoading = true;
  const promise = await fetch(VALIDATE_WORD_URL, {
    method: "POST",
    body: JSON.stringify(wordObject)
  })
  const validationJson = await promise.json();
  hideLoader();
  isLoading = false;
  return validationJson.validWord;
}
function compareWord(word, inputs) {
  let matchedIndices = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    let input = document.getElementsByClassName("row").item(tries).getElementsByClassName("input").item(i);
    if (word[i] === wordOfTheDay[i]) {
      input.classList.add("match-letter");
      matchedIndices.push(i);
    } else {
      input.classList.add("mismatch-letter");
    }
    input.classList.add("white-font");
  }
  let unmatchedWord = "";
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (!matchedIndices.includes(i)) {
      unmatchedWord += wordOfTheDay[i];
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (!matchedIndices.includes(i) && unmatchedWord.includes(word[i])) {
      document.getElementsByClassName("row").item(tries).getElementsByClassName("input").item(i).classList.add("includes-letter");
    } 
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
