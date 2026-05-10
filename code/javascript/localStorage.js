
/*====================*/
/*====================*/
/*====================*/

function loadHiScores() {
    hiScores = [];

    let rawData = JSON.parse(localStorage.getItem("hiScores"));

    if (rawData === null || !Array.isArray(rawData)) {
        let baseLine = {"name": "-----", "score": "----"};
        for (let i = 0; i < HISCORE_LINE_COUNT; i++) {
            hiScores.push(baseLine);
        }
    }
    else
        hiScores = rawData;
    //else if ()
}

/*====================*/
/*====================*/
/*====================*/

function saveHiScores() {
    localStorage.setItem("hiScores", JSON.stringify(hiScores));
}

/*====================*/
/*====================*/
/*====================*/

function isValidHiScoreList() {

}

/*====================*/
/*====================*/
/*====================*/
