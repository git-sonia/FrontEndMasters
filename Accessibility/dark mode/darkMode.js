const checkbox = document.querySelector("#input");
const main = document.querySelector("#main");

if (checkbox.checked) {
  console.log("checkbox checked");
}

checkbox.addEventListener("click", () => {
  console.log("checkbox changed");
  if (checkbox.checked) {
    main.classList.remove("light-background");
    main.classList.add("dark-background");
  } else {
    main.classList.remove("dark-background");
    main.classList.add("light-background");
  }
})