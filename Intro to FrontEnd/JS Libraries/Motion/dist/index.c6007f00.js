const ball = document.querySelector(".ball");
popmotion.animate({
    from: "0px",
    to: "100px",
    repeat: Infinity,
    repeatType: "mirror",
    type: "spring",
    onUpdate (update) {
        ball.style.left = update;
    }
});

//# sourceMappingURL=index.c6007f00.js.map
