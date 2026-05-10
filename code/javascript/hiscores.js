
/*====================*/
/*====================*/
/*====================*/

function populateHiScores() {
    e_hiScoreList.innerHTML = "";
    let newDivRow, newDiv;

    let flex = [1, 4, 2];

    for (let i = 0; i < hiScores.length; i++) {
        newDivRow = document.createElement("div");
        //newDivRow.classList.add("cl_highlightHiScoreItem");

        newDiv = document.createElement("div");
        newDiv.innerHTML = `${i+1}.`;
        newDiv.classList.add("cl_hiScoreRank");
        newDiv.style.flex = flex[0];
        newDivRow.appendChild(newDiv);

        newDiv = document.createElement("div");
        newDiv.innerHTML = hiScores[i].name;
        newDiv.classList.add("cl_hiScoreName");
        newDiv.style.flex = flex[1];
        newDivRow.appendChild(newDiv);

        newDiv = document.createElement("div");
        newDiv.innerHTML = hiScores[i].score;
        newDiv.classList.add("cl_hiScoreScore");
        newDiv.style.flex = flex[2];
        newDivRow.appendChild(newDiv);

        e_hiScoreList.appendChild(newDivRow);
    }
}

/*====================*/
/*====================*/
/*====================*/

function updateHiScores(name, score) {
    let i = 0;

    while (i < HISCORE_LINE_COUNT && parseInt(hiScores[i].score) != NaN && parseInt(hiScores[i].score) > score)
        i++;

    if (i >= 10)
        alert("Sajnos nem kerültél rá a listára.");
    else {
        hiScores.splice(i, 0, {"name": name, "score": String(score)});
        hiScores.splice(10);
        populateHiScores();
        saveHiScores();
        e_hiScoreList.children[i].classList.add("cl_highlightHiScoreItem");
    }
}

/*====================*/
/*====================*/
/*====================*/

function clearHiScoreHighlight() {
    for (const child of e_hiScoreList.children) {
        child.classList.remove("cl_highlightHiScoreItem");
    }
}

/*====================*/
/*====================*/
/*====================*/

