const skipButton = document.querySelector("#skip");
const buttonLand = document.querySelector("#button-land");

document.addEventListener("keyup", (e) => {
  if (e.key === "Tab") {
    skipButton.classList.remove("hidden");
    skipButton.focus(); 
  }
})

skipButton.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    buttonLand.focus();
  }
})