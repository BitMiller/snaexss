
/*====================*/
/*====================*/
/*====================*/

function keyDownHandler(event) {
    if (!pressedKeys.has(event.code)) {
        pressedKeys.add(event.code);

        let isCombo = isComboPressed();
        if (isCombo)
            return;
        else if (keyCapture.mode == KEY_CAPTURE_MODE.PLAYING) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (keyCapture.mode == KEY_CAPTURE_MODE.FLOATER) {
            if (!e_setPlayerName.classList.contains("cl_displayNone")) {
            //if (e_setPlayerName.style.display != "none") {
                if (event.code == "Enter" || event.code == "NumpadEnter" || event.code == "Escape") {
                    event.preventDefault();
                    event.stopPropagation();

                    if (event.code == "Enter" || event.code == "NumpadEnter")
                        playerNameOK();
                    else if (event.code == "Escape")
                        playerNameCancel();
                }
            }
        }

        else if (keyCapture.mode == KEY_CAPTURE_MODE.PLAYING) {
            if (directionKeys.includes(event.code)) {
                keyDirectionsHandler(event.code);
            }

            else if (event.code == "Space" || event.code == "Enter" || event.code == "NumpadEnter") {
                keySpaceHandler();
            }
            else if (event.code == "Escape" && gameState == GAME_STATE.PLAYING)
                gamePause();
        }
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

function handleNameBeforeInput(event) {
    //console.log(e_playerNameInput.selectionStart != e_playerNameInput.selectionEnd);

    if (event.data === null)
        return;

    if (e_playerNameInput.value.length >= 20 && e_playerNameInput.selectionStart == e_playerNameInput.selectionEnd) {
        if (!e_playerNameInput.classList.contains("cl_animFlashRedTwice"))
            e_playerNameInput.classList.add("cl_animFlashRedTwice");
        event.preventDefault();
        event.stopPropagation();
    }

}

/*====================*/
/*====================*/
/*====================*/

function handleNameInput() {
    if (e_playerNameInput.value.length > 20)
        e_playerNameInput.value = e_playerNameInput.value.substring(0, 20);
}

/*====================*/
/*====================*/
/*====================*/
