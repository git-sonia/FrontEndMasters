


const statement = document.querySelector("#statement");
const optionButtons = document.querySelector("#options").children;
const explanation = document.querySelector("#explanation");


const fact = {
  statement: "'1' + '1' === '2'",
  answer: false,
  explanation: "False, '1' + '1' = '11' since Javascript sees them as strings."
};


statement.textContent = fact.statement;
    
function disable(button) {
  button.setAttribute("disabled", "");
}

function enable(button) {
  button.removeAttribute("disabled");
}

function isCorrect(guess) {
  return guess === fact.answer.toString();
}

for (let optionButton of optionButtons) {
  optionButton.addEventListener("click", () => {
    explanation.textContent = fact.explanation;
    let guess = optionButton.textContent;
    for (let button of optionButtons) {
      disable(button);
    }
    if (isCorrect(guess)) {
      optionButton.classList.add("correct");
    } else {
      optionButton.classList.add("incorrect");
    }
  })
}
