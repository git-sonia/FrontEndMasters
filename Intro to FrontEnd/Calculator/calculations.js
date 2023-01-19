let result = "0";
let numberInput = "";
let operation = "";
let resultArea = document.querySelector(".result");
document
  .querySelectorAll(".positive-numbers, .zero")
  .forEach(element => {
    element.addEventListener("click", event => {
      numberInput += event.target.innerText;
      resultArea.innerText = numberInput;
    })
  });
document
  .querySelector(".operations")
  .addEventListener("click", event => {
    resultArea.innerText = "0";
    if (operation === "+") {
      result = add();
    } else if (operation === "−") {
      result = subtract();
    } else if (operation === "×") {
      result = multiply();
    } else if (operation === "÷") {
      result = divide();
    } else {
      result = numberInput;
    }
    operation = event.target.innerText;
    if (operation === "=") {
      resultArea.innerText = result;
      numberInput = "" + result;
    } else {
      numberInput = "";
    }
  })
document
  .querySelector(".clear")
  .addEventListener("click", event => {
    result = "0";
    resultArea.innerText = "0";
    numberInput = "";
    operation = "";
  })
document
  .querySelector(".back-space")
  .addEventListener("click", event => {
    backSpace();
  })
const add = () => {
  return parseInt(result) + parseInt(numberInput);
}
const subtract = () => {
  return parseInt(result) - parseInt(numberInput);
}
const multiply = () => {
  return parseInt(result) * parseInt(numberInput);
}
const divide = () => {
  return parseInt(result) / parseInt(numberInput);
}
const backSpace = () => {
  numberInput = numberInput.slice(0, -1);
  if (numberInput === "") {
    resultArea.innerText = "0";
  } else {
    resultArea.innerText = numberInput;
  }
}