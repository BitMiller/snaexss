
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

    e_gameAreaContainer.style.width = (gridSize*(xSize+6))+"px";
    e_gameAreaContainer.style.height = (gridSize*(ySize+6))+"px";

    gameIdle();

});
