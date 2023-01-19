let letterCount = 0;
const inputs = document.querySelector(".row").children;
document
  .querySelector("body")
  .addEventListener("keyup", event => {
    console.log(letterCount);
    inputs.item(letterCount).innerHTML = "2";
    letterCount++;
  });