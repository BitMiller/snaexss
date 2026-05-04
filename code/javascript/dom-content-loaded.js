
document.addEventListener("DOMContentLoaded", function (event) {

    /*console.log(`window.innerWidth: ${window.innerWidth}`);
    console.log(`window.innerHeight: ${window.innerHeight}`);*/

/*
    setCookie("player", "Anonymous", 1/24);
    setCookie("testKey", "testValue", 1/24);
*/
    getCookies();
    if (typeof cookies.player === "undefined" || cookies.player == "") {
        //setCookie("player", "Anonymous", 1/24);
        console.log("showSetPlayerNameFloater()");
        showSetPlayerNameFloater();
    }
    else {
        e_sp_playerName.innerHTML = cookies.player;
        e_playerName.innerHTML = cookies.player;
        console.log("showWelcomeFloater()");
        showWelcomeFloater();
    }

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
        e_overlay.classList.toggle("cl_active");
        disableGameKeysCapture();
        if (gameState == GAME_STATE.PLAYING) {
            keySpaceHandler();
            wasPlayingBeforeMenu = true;
        }
    });

    e_bt_toggleDescriptionInner.addEventListener("click", () => {
        e_description.classList.toggle("cl_displayNone");
        e_overlay.classList.toggle("cl_active");
        enableGameKeysCapture();
        if (gameState == GAME_STATE.PAUSED && wasPlayingBeforeMenu) {
            keySpaceHandler();
            wasPlayingBeforeMenu = false;
        }
    });

    e_bt_toggleHiScores.addEventListener("click", () => {
        e_hiScores.classList.toggle("cl_displayNone");
        e_overlay.classList.toggle("cl_active");
        disableGameKeysCapture();
        if (gameState == GAME_STATE.PLAYING) {
            keySpaceHandler();
            wasPlayingBeforeMenu = true;
        }
    });

    e_bt_toggleHiScoresInner.addEventListener("click", () => {
        e_hiScores.classList.toggle("cl_displayNone");
        e_overlay.classList.toggle("cl_active");
        enableGameKeysCapture();
        if (gameState == GAME_STATE.PAUSED && wasPlayingBeforeMenu) {
            keySpaceHandler();
            wasPlayingBeforeMenu = false;
        }
    });

    e_nameLine.addEventListener("click", () => {
        console.log("clicked");
        showSetPlayerNameFloater();
    });

    e_playerNameInput.addEventListener("beforeinput", (event) => {
        console.log(event.data);
    });

    e_bt_playerName.addEventListener("click", () => {
        setPlayerName();
    });

    gameIdle();

});
