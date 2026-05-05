
function showSetPlayerNameFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.FLOATER;
    e_setPlayerName.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
}

/*====================*/
/*====================*/
/*====================*/

function hideSetPlayerNameFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.PLAYING;
    e_setPlayerName.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
}

/*====================*/
/*====================*/
/*====================*/

function showWelcomeFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.FLOATER;
    e_welcomePlayer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
    setTimeout(hideWelcomeFloater, 2500);
}

/*====================*/
/*====================*/
/*====================*/

function hideWelcomeFloater() {
    keyCapture.mode = KEY_CAPTURE_MODE.PLAYING;
    e_welcomePlayer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
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
}

/*====================*/
/*====================*/
/*====================*/

function playerNameOK() {
    setPlayerName(e_playerNameInput.value.trim().replace(/\s\s+/g, ' '));
    hideSetPlayerNameFloater();
}

/*====================*/
/*====================*/
/*====================*/

function playerNameCancel() {
    setPlayerName(e_playerName.innerHTML.trim().replace(/\s\s+/g, ' '));
    hideSetPlayerNameFloater();
}