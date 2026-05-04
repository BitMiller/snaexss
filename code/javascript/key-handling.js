
const pressedKeys = new Set();

const controlBuffer = [];

const directionKeys = [
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft"
];

let wasPlayingBeforeMenu = false;

let captureGameKeys = true;

let gameState = GAME_STATE.IDLE;

const combos = [
    ["F11"], //> Full Screen
    ["F12"], //> Dev Tools
    ["ControlLeft", "ShiftLeft", "KeyR"], //> Full Reload Page on Win
    ["MetaLeft", "ShiftLeft", "KeyR"], //> Full Reload Page on Mac
];

/*====================*/
/*====================*/
/*====================*/

function keyDownHandler(event) {
    if (!captureGameKeys)
        return;

    if (!pressedKeys.has(event.code)) {
        pressedKeys.add(event.code);
    }

    let isCombo = isComboPressed();
    if (!isCombo) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (directionKeys.includes(event.code)) {
        keyDirectionsHandler(event.code);
    }

    if (event.code == "Space" || event.code == "Enter") {
        keySpaceHandler();
    }
}

/*====================*/
/*====================*/
/*====================*/

function keyUpHandler(event) {
    if (pressedKeys.has(event.code)) {
        event.preventDefault();
        event.stopPropagation();

        pressedKeys.delete(event.code);
    }
}

/*====================*/
/*====================*/
/*====================*/

function keyDirectionsHandler(keyCode) {
    if (gameState == GAME_STATE.PLAYING && DIRECTION_TO_KEY[(snake.direction+2)%4] != keyCode)
        controlBuffer.push(keyCode);
}

/*====================*/
/*====================*/
/*====================*/

function keySpaceHandler() {
    if (gameState == GAME_STATE.IDLE || gameState == GAME_STATE.PAUSED)
        gamePlay();
    else if (gameState == GAME_STATE.DEAD || gameState == GAME_STATE.WON) {
        console.log("Revival!");
        gameIdle();
    }
    else //> if (gameState == GAME_STATE.PLAYING)
        gamePause();
}

/*====================*/
/*====================*/
/*====================*/

function isComboPressed(combo = []) {

    let match = false;

    if (combo.length == 0) {
        let i = 0;
        while (i < combos.length && !match) {
            let j = 0;
            while (j < combos[i].length && pressedKeys.has(combos[i][j]))
                j++;
            if (j == combos[i].length)
                match = true;
            i++;
        }
        //console.log("isComboPressed.if");
    }
    else {
        let i = 0;
        while (i < combo.length && pressedKeys.has(combo[i]))
            i++;
        if (i == combo.length)
            match = true;
        //console.log("isComboPressed.else");
    }

    return match;

}

/*====================*/
/*====================*/
/*====================*/

function disableGameKeysCapture() {
    captureGameKeys = false;
    pressedKeys.clear();
}

/*====================*/
/*====================*/
/*====================*/

function enableGameKeysCapture() {
    captureGameKeys = true;
}
