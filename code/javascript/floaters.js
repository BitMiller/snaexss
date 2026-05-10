
/*====================*/
/*====================*/
/*====================*/

function showSetPlayerNameFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.FLOATER;
    e_setPlayerName.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_overlayActive");
    e_overlayEffect.classList.toggle("cl_overlayEffectActive");
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
    e_overlayEffect.classList.toggle("cl_overlayEffectActive");
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
    gameState = GAME_STATE.WELCOME;
    e_welcomePlayerContainer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_overlayActive");
    e_overlayEffect.classList.toggle("cl_overlayEffectActive");
    //e_overlay.classList.toggle("cl_displayNone");
    welComeFloaterSetTimeoutHandle = setTimeout(hideWelcomeFloater, 2500);
}

/*====================*/
/*====================*/
/*====================*/

function hideWelcomeFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.PLAYING;
    gameState = GAME_STATE.IDLE;
    e_welcomePlayerContainer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_overlayActive");
    e_overlayEffect.classList.toggle("cl_overlayEffectActive");
    //e_overlay.classList.toggle("cl_displayNone");
}

/*====================*/
/*====================*/
/*====================*/

function setPlayerName(name) {
    if (name == "")
        name = ANONYMOUS;

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

function showDescription() {
    e_description.classList.remove("cl_displayNone");
    e_overlay.classList.add("cl_overlayActive");
    e_overlayEffect.classList.add("cl_overlayEffectActive");
    //requestAnimationFrame(() => { e_overlayEffect.classList.toggle("cl_overlayEffectActive"); });
    keyCapture.mode = KEY_CAPTURE_MODE.FLOATER;
    if (gameState == GAME_STATE.PLAYING) {
        keySpaceHandler();
        wasPlayingBeforeMenu = true;
    }
}

/*====================*/
/*====================*/
/*====================*/

function hideDescription() {
    e_description.classList.add("cl_displayNone");
    e_overlay.classList.remove("cl_overlayActive");
    e_overlayEffect.classList.remove("cl_overlayEffectActive");
    keyCapture.mode = KEY_CAPTURE_MODE.PLAYING;
    if (gameState == GAME_STATE.PAUSED && wasPlayingBeforeMenu) {
        keySpaceHandler();
        wasPlayingBeforeMenu = false;
    }
}

/*====================*/
/*====================*/
/*====================*/

function showHiScores() {
    e_hiScores.classList.remove("cl_displayNone");
    e_overlay.classList.add("cl_overlayActive");
    e_overlayEffect.classList.add("cl_overlayEffectActive");
    keyCapture.mode = KEY_CAPTURE_MODE.FLOATER;
    if (gameState == GAME_STATE.PLAYING) {
        keySpaceHandler();
        wasPlayingBeforeMenu = true;
    }
}

/*====================*/
/*====================*/
/*====================*/

function hideHiScores() {
    e_hiScores.classList.add("cl_displayNone");
    e_overlay.classList.remove("cl_overlayActive");
    e_overlayEffect.classList.remove("cl_overlayEffectActive");
    clearHiScoreHighlight();
    keyCapture.mode = KEY_CAPTURE_MODE.PLAYING;
    if (gameState == GAME_STATE.PAUSED && wasPlayingBeforeMenu) {
        keySpaceHandler();
        wasPlayingBeforeMenu = false;
    }
}

/*====================*/
/*====================*/
/*====================*/
