const ball = document.querySelector(".ball");
const popmotion = require("popmotion");
popmotion.animate({
  from: "0px",
  to: "100px",
  repeat: Infinity,
  repeatType: "mirror",
  type: "spring",
  onUpdate(update) {
    ball.style.left = update;
  }
})