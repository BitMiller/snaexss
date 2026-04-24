let frame = 0;

let animationHandle = undefined;

function frameStep() {
    if (frame % 10 == 0) {
        //> Handle direction control:
        if (controlBuffer.length > 0) {
            snake.direction = KEY_TO_DIRECTION[controlBuffer[controlBuffer.length-1]];
        }
        controlBuffer.splice(0, controlBuffer.length);

        snakeStep();
        drawGameArea();
        //console.log("Step!");
    }

    frame++;
}

function startAnimation() {
    if (animationHandle === undefined)
        animationHandle = setInterval(frameStep, 25);
}

function stopAnimation() {
    //console.log("Stopped!");
    if (animationHandle !== undefined) {
        clearInterval(animationHandle);
        animationHandle = undefined;
    }
}
