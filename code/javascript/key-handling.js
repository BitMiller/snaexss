
const pressedKeys = new Set();

const controlBuffer = [];

const controlKeys = [
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft"
];

let residueKey = false;

let gameState = GAME_STATE.IDLE;

const combos = [
    ["KeyF"], //> Test
    ["ControlLeft", "KeyF"], //> Test
    ["F11"], //> Full Screen
    ["F12"], //> Dev Tools
    ["ControlLeft", "ShiftLeft", "KeyR"] //> Full Reload Page
];

/*====================*/
/*====================*/
/*====================*/

function keyDownHandler(event) {
    if (!pressedKeys.has(event.code)) {
        pressedKeys.add(event.code);
    }

    let isCombo = isComboPressed();
    if (!isCombo) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (gameState == GAME_STATE.PLAYING && controlKeys.includes(event.code) && DIRECTION_TO_KEY[(snake.direction+2)%4] != event.code) {
        controlBuffer.push(event.code);
    }

    if (event.code == "Space") {
        console.log(`gameState: ${gameState}`);
        if (gameState == GAME_STATE.IDLE || gameState == GAME_STATE.PAUSED)
            gamePlay();
        else if (gameState == GAME_STATE.DEAD) {
            console.log("Revival!");
            gameIdle();
        }
        else
            gamePause();
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
