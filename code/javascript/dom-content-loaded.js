
document.addEventListener("DOMContentLoaded", function (event) {

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    window.addEventListener("blur", () => {
        pressedKeys.clear();
        gamePause();
        console.log("Window focus lost.");
    });

    window.addEventListener("focus", () => {
        console.log("Window focus is back.");
    });

    e_bt_toggleDescription.addEventListener("click", () => {
        e_description.classList.toggle("cl_displayNone");
    });

    e_bt_toggleDescriptionInner.addEventListener("click", () => {
        e_description.classList.toggle("cl_displayNone");
    });

    e_bt_toggleHiScores.addEventListener("click", () => {
        e_hiScores.classList.toggle("cl_displayNone");
    });

    e_bt_toggleHiScoresInner.addEventListener("click", () => {
        e_hiScores.classList.toggle("cl_displayNone");
    });

    gameIdle();

});
