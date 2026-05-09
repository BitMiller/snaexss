
/*====================*/
/*====================*/
/*====================*/

function showSetPlayerNameFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.FLOATER;
    e_setPlayerName.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_overlayActive");
    //e_overlay.classList.toggle("cl_displayNone");
    if (gameState == GAME_STATE.PLAYING) {
        //gamePause();
        keySpaceHandler();
        wasPlayingBeforeMenu = true;
    }
}

/*====================*/
/*====================*/
/*====================*/

function hideSetPlayerNameFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.PLAYING;
    e_setPlayerName.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_overlayActive");
    //e_overlay.classList.toggle("cl_displayNone");
    if (gameState == GAME_STATE.PAUSED && wasPlayingBeforeMenu) {
        //gamePlay();
        keySpaceHandler();
        wasPlayingBeforeMenu = false;
    }
}

/*====================*/
/*====================*/
/*====================*/

function showWelcomeFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.FLOATER;
    e_welcomePlayer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_overlayActive");
    //e_overlay.classList.toggle("cl_displayNone");
    setTimeout(hideWelcomeFloater, 2500);
}

/*====================*/
/*====================*/
/*====================*/

function hideWelcomeFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.PLAYING;
    e_welcomePlayer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_overlayActive");
    //e_overlay.classList.toggle("cl_displayNone");
}

/*====================*/
/*====================*/
/*====================*/

function setPlayerName(name) {
    if (name == "")
        name = "Anonymous";

    e_playerNameInput.value = name;
    e_sp_playerName.innerHTML = name;
    e_playerName.innerHTML = name;
    setCookie("player", name, 1/24);

    //gameIdle();
    /*console.log("Setting player name to:");
    console.log(name);*/
}

/*====================*/
/*====================*/
/*====================*/

function playerNameOK() {
    let name = e_playerNameInput.value.trim().replace(/\s\s+/g, ' ');

    if (e_playerName.innerHTML != name && (gameState == GAME_STATE.IDLE || confirm("Névváltoztatáskor a játék újraindul!"))) {
        setPlayerName(name);
        hideSetPlayerNameFloater();
        if (gameState != GAME_STATE.IDLE)
            gameIdle();
    }
    else
        playerNameCancel();
}

/*====================*/
/*====================*/
/*====================*/

function playerNameCancel() {
    setPlayerName(e_playerName.innerHTML.trim().replace(/\s\s+/g, ' '));
    hideSetPlayerNameFloater();
}

/*====================*/
/*====================*/
/*====================*/

function signOut() {
    if (gameState == GAME_STATE.IDLE || confirm("Kijelentkezéskor a játék újraindul!")) {
        setPlayerName("");
        if (gameState != GAME_STATE.IDLE)
            gameIdle();
    }
}

/*====================*/
/*====================*/
/*====================*/
