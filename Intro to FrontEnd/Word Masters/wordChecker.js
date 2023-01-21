let letterCount = 0;
let tries = 0;
let word = "";
const wordLength = 5;
const totalTries = 6;
const rows = document.querySelectorAll(".row");
const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";
const WORD_OF_DAY_URL = "https://words.dev-apis.com/word-of-the-day";

let wordOfTheDay = "";
getWord().then(function (word) {
  wordOfTheDay = word;
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
    const letter = event.key;
    if (letter === "Enter" && letterCount === wordLength) {
      checkWord(word);
    } else if (letterCount < wordLength) {
      if (isLetter(letter)) {
        inputLetter(letter, inputs);
      }
    }
  });
function inputLetter(letter, inputs) {
  word += letter;
  inputs[letterCount].innerHTML = letter.toUpperCase();
  letterCount++; 
}
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
function losingScreen() {
  alert("lost");
}
function checkWord(word) {
  const wordObject = {
    word: word
  }
  isWord(wordObject).then(function (isWordResult) {
    if (isWordResult) {
      console.log("is word");
      submitWord();
    } else {
      console.log("not word");
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
  const promise = await fetch(VALIDATE_WORD_URL, {
    method: "POST",
    body: JSON.stringify(wordObject)
  })
  const validationJson = await promise.json();
  return validationJson.validWord;
}
