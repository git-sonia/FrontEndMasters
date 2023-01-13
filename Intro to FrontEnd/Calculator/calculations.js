document
  .querySelector(".button-container")
  .addEventListener("click", function (event) {
  alert(`You clicked on button ${event.target.innerText}`);
});