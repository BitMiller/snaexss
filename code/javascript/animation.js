let frame = 0;
let winAnimationFrame = 0;

let animationHandle = undefined;

let frameInterval = 15;
let stepInterval = 10;
let winInterval = 3;


function frameStep() {
    if (frame % stepInterval == 0 && !snakeFreeze) {
        //> Handle direction control:
        if (controlBuffer.length > 0) {
            snake.direction = KEY_TO_DIRECTION[controlBuffer[controlBuffer.length-1]];
        }
        controlBuffer.splice(0, controlBuffer.length);

        snakeStep();
        drawGameArea();
        //console.log("Step!");
    }

    if (gameState == GAME_STATE.WON && frame % winInterval == 0) {
        drawWinnerSnakeToArea();
        winAnimationFrame++;
    }

    frame++;
}

function startAnimation() {
    if (animationHandle === undefined)
        animationHandle = setInterval(frameStep, frameInterval);
}

function stopAnimation() {
    //console.log("Stopped!");
    if (animationHandle !== undefined) {
        clearInterval(animationHandle);
        animationHandle = undefined;
    }
}
