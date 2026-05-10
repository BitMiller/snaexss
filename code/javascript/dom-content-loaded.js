
document.addEventListener("DOMContentLoaded", () => {

    /*console.log(`window.innerWidth: ${window.innerWidth}`);
    console.log(`window.innerHeight: ${window.innerHeight}`);*/

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

    e_bt_showDescription.addEventListener("click", () => {
        showDescription();
    });

    e_bt_hideDescription.addEventListener("click", () => {
        hideDescription();
    });

    e_bt_showHiScores.addEventListener("click", () => {
        showHiScores();
    });

    e_bt_hideHiScores.addEventListener("click", () => {
        hideHiScores();
    });

    e_nameLine.addEventListener("click", () => {
        console.log("clicked");
        showSetPlayerNameFloater();
    });

    e_playerNameInput.addEventListener("beforeinput", (event) => {
        handleNameBeforeInput(event);
    });

    e_playerNameInput.addEventListener("input", (event) => {
        handleNameInput();
    });

    e_bt_playerNameOK.addEventListener("click", () => {
        playerNameOK();
    });

    e_bt_playerNameCancel.addEventListener("click", () => {
        playerNameCancel();
    });

    e_playerNameInput.addEventListener("animationend", () => {
        e_playerNameInput.classList.remove("cl_animFlashRedTwice");
    });

    e_signOut.addEventListener("click", () => {
        signOut();
    });

    e_welcomePlayerContainer.addEventListener("click", () => {
        clearTimeout(welComeFloaterSetTimeoutHandle);
        hideWelcomeFloater();
    });

    e_overlayCancel.addEventListener("click", () => {
        if (!e_setPlayerName.classList.contains("cl_displayNone"))
            playerNameCancel();
    });




    gameIdle();

    getCookies();
    if (typeof cookies.player === "undefined" || cookies.player == "" || cookies.player == ANONYMOUS) {
        showSetPlayerNameFloater();
    }
    else {
        e_playerNameInput.value = cookies.player;
        e_sp_playerName.innerHTML = cookies.player;
        e_playerName.innerHTML = cookies.player;
        //console.log("showWelcomeFloater()");
        showWelcomeFloater();
    }

    loadHiScores();
    populateHiScores();

});
