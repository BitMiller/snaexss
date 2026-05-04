
function showSetPlayerNameFloater() {
    disableGameKeysCapture();
    e_setPlayerName.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
}

/*====================*/
/*====================*/
/*====================*/

function hideSetPlayerNameFloater() {
    enableGameKeysCapture();
    e_setPlayerName.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
}

/*====================*/
/*====================*/
/*====================*/

function showWelcomeFloater() {
    disableGameKeysCapture();
    e_welcomePlayer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
    setTimeout(hideWelcomeFloater, 2500);
}

/*====================*/
/*====================*/
/*====================*/

function hideWelcomeFloater() {
    enableGameKeysCapture();
    e_welcomePlayer.classList.toggle("cl_displayNone");
    e_overlay.classList.toggle("cl_active");
}

/*====================*/
/*====================*/
/*====================*/

function setPlayerName() {
    e_sp_playerName.innerHTML = e_playerNameInput.value;
    e_playerName.innerHTML = e_playerNameInput.value;
    hideSetPlayerNameFloater();
}
