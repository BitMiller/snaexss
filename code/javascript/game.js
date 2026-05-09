
/*====================*/
/*====================*/
/*====================*/

function gameIdle() {
//> Reset game (play area, couters), show starter text (Press space to play, on mobiles: Tap here to start)
    gameState = GAME_STATE.IDLE;
    snakeFreeze = false;
    stopAnimation();
    e_appleCounter.innerHTML = 0;
    e_poisonCounter.innerHTML = 0;
    e_stepCounter.innerHTML = 0;

    generateGameArea(e_gameAreaContainer);
    healPoison();

    for (let i = 0; i < 10; i++)
        spawnPoisonedApple();

    spawnSnake();
    drawGameArea();
}

/*====================*/
/*====================*/
/*====================*/

function gamePlay() {
    if (gameState == GAME_STATE.IDLE || gameState == GAME_STATE.PAUSED) {
        gameState = GAME_STATE.PLAYING;
        startAnimation();
    }
}

/*====================*/
/*====================*/
/*====================*/

function gamePause() {
    if (gameState == GAME_STATE.PLAYING) {
        gameState = GAME_STATE.PAUSED;
        stopAnimation();
    }
}

/*====================*/
/*====================*/
/*====================*/

function gameUnpause() {
    if (gameState == GAME_STATE.PAUSED) {
        gameState = GAME_STATE.PLAYING;
        startAnimation();
    }
}

/*====================*/
/*====================*/
/*====================*/

function gameDead() {
    healPoison();
    gameState = GAME_STATE.DEAD;
    stopAnimation();
}

/*====================*/
/*====================*/
/*====================*/

function gameWon() {
    healPoison();
    gameState = GAME_STATE.WON;
    snakeFreeze = true;
}

/*====================*/
/*====================*/
/*====================*/
