
let gameArea = [];
let gameAreaOverlay1 = [];
let xSize = 20;
let ySize = 20;
let gridSize = 15

/*====================*/
/*====================*/
/*====================*/

function generateGameArea(elementAttachTo) {

    elementAttachTo.innerHTML = "";

    gameArea = [];
    for (let i = 0; i < xSize; i++) {
        gameArea[i] = [];
        for (let j = 0; j < ySize; j++) {
            gameArea[i][j] = {};
            gameArea[i][j].type = 0;
        }
    }

    let newTable = document.createElement("table");
    newTable.classList.add("cl_positionAbsolute");
    newTable.style.tableLayout = "fixed";
    newTable.style.width = (gridSize*(xSize+6))+"px";
    newTable.style.height = (gridSize*(ySize+6))+"px";

    for (let j = 0; j < ySize; j++) {
        let newTr = document.createElement("tr");

        for (let i = 0; i < xSize; i++) {
            let newTd = document.createElement("td");
            newTd.style.width = gridSize+"px";
            newTd.style.height = gridSize+"px";
            newTr.appendChild(newTd);
            gameArea[i][j].element = newTd;
        }

        newTable.appendChild(newTr);
    }

    let tableOverlay1 = newTable.cloneNode(true);
    //tableOverlay1.style.background = "#f005";

    newTable.id = "id_tb_gameArea";
    elementAttachTo.appendChild(newTable);

    tableOverlay1.id = "id_tb_gameAreaOverlay1";
    elementAttachTo.appendChild(tableOverlay1);

}

/*====================*/
/*====================*/
/*====================*/

function clearGameArea() {
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            gameArea[i][j].type = 0;
        }
    }
}

/*====================*/
/*====================*/
/*====================*/

function drawGameArea() {
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            gameArea[i][j].element.style.background = areaTypes[gameArea[i][j].type];
        }
    }
}

/*====================*/
/*====================*/
/*====================*/

function isOutPosition(x, y) {
    return !isInGameArea(x, y) || getPosition(x, y) == 9999;
}

/*====================*/
/*====================*/
/*====================*/

function isClearPosition(x, y) {
    return (isInGameArea(x, y) && (gameArea[x][y].type == 0 || gameArea[x][y].type >= 1000));
}

/*====================*/
/*====================*/
/*====================*/

function isClearPositionOrOut(x, y) {
    return (!isInGameArea(x, y) || isClearPosition(x, y));
}

/*====================*/
/*====================*/
/*====================*/

function isInGameArea(x, y) {
    return (x >= 0 && x < xSize && y >= 0 && y < ySize);
}

/*====================*/
/*====================*/
/*====================*/

function setPosition(x, y, type) {
    if (isInGameArea(x, y))
        gameArea[x][y].type = type;
}

/*====================*/
/*====================*/
/*====================*/

function getPosition(x, y) {
    if (isInGameArea(x, y))
        return gameArea[x][y].type;
    else
        return 9999;
}

/*====================*/
/*====================*/
/*====================*/

function isPosition(x, y, posNum) {
    return getPosition(x, y) == posNum;
}

/*====================*/
/*====================*/
/*====================*/

function spawnPoint(clearanceDistance = 0, areaType) {
    let tries = 0;
    let maxTries = 100;
    let x = 0;
    let y = 0;
    while (tries < maxTries) {
        x = Math.floor(Math.random() * xSize);
        y = Math.floor(Math.random() * ySize);
/*
        let isClearPos = isClearPosition(x, y);
        let isClearDir = isClearInAllDirections(x, y, clearanceDistance);
        //console.log(`isClearPosition(${x}, ${y}) : ${isClearPos}`);
        //console.log(`isClearInAllDirections(${x}, ${y}, ${clearanceDistance}) : ${isClearDir}`);
        if (isClearPos && isClearDir)
            break;
*/
        if (isClearInRadiusOrOut(x, y, clearanceDistance))
            break;
        tries++;
    }
    if (tries == maxTries)
        console.log(`spawnPoint(): Unbelievable! Couldn't spawn a point in a max of ${maxTries} tries!`);
    else
        setPosition(x, y, areaType);
    //console.log("Tries: "+tries);
}

/*====================*/
/*====================*/
/*====================*/

function spawnApple(clearanceDistance = 0) {
    spawnPoint(clearanceDistance, TYPE.APPLE);
}

/*====================*/
/*====================*/
/*====================*/

function spawnPoison(clearanceDistance = 0) {
    spawnPoint(clearanceDistance, TYPE.POISON);
}

/*====================*/
/*====================*/
/*====================*/

function spawnPoisonedApple(clearDist = 2) {
    let apple = locateSpawnPoint(clearDist);
    if (!apple)
        return;

    let i = 0;
    let randDir = Math.floor(Math.random() * 4);
    let x2, y2;

    do {
        x2 = apple.x + DIRECTION[(i+randDir)%4].x;
        y2 = apple.y + DIRECTION[(i+randDir)%4].y;
        i++;
    }
    while (i <= 4 && !isClearPosition(x2, y2));

    setPosition(apple.x, apple.y, TYPE.APPLE);
    setPosition(x2, y2, TYPE.POISON);
}

/*====================*/
/*====================*/
/*====================*/

function locateSpawnPoint(clearDist = 0, maxTries = 100) {
    let tries = 0;
    let x = 0;
    let y = 0;
    while (tries < maxTries) {
        x = Math.floor(Math.random() * xSize);
        y = Math.floor(Math.random() * ySize);
        if (isClearInRadiusOrOut(x, y, clearDist))
            break;
        tries++;
    }

    if (tries == maxTries) {
        console.log(`locateSpawnPoint(): Unbelievable! Couldn't locate a point in a max of ${maxTries} tries!`);
        return false;
    }
    else
        return { "x": x, "y": y };
}

/*====================*/
/*====================*/
/*====================*/

function isClearInDirection(xPos, yPos, direction, distance) {
    let clear = true;

    let i = 1;
    /*console.log("direction:");
    console.log(direction);
    console.log(`xPos + direction.x * i : ${xPos + direction.x * i}`);
    console.log(`yPos + direction.y * i : ${yPos + direction.y * i}`);*/
    while (i <= distance && isClearPosition(xPos + direction.x * i, yPos + direction.y * i))
        i++;
    if (i <= distance)
        clear = false;
    //console.log("Clear? : "+clear);
    return clear;
}

/*====================*/
/*====================*/
/*====================*/

function isClearInAllDirections(xPos, yPos, distance) {
    let clear = true;

    let i = 0;
    while (i < 4 && isClearInDirection(xPos, yPos, DIRECTION[i], distance))
        i++;
    if (i < 4)
        clear = false;

    return clear;
}

/*====================*/
/*====================*/
/*====================*/

function isClearInRectangle(x, y, halfSide) {
    let clear = true;

    let i = -halfSide;
    while (i <= halfSide && clear) {
        let j = -halfSide;
        while (j <= halfSide && clear) {
            clear = clear && isClearPosition(x+i, y+j);
            j++;
        }
        i++;
    }

    return clear;
}

/*====================*/
/*====================*/
/*====================*/

function isClearInRectangleOrOut(x, y, halfSide) {
    let clear = true;

    let i = -halfSide;
    while (i <= halfSide && clear) {
        let j = -halfSide;
        while (j <= halfSide && clear) {
            clear = clear && isClearPositionOrOut(x+i, y+j);
            j++;
        }
        i++;
    }

    return clear;
}

/*====================*/
/*====================*/
/*====================*/

function isClearInRadius(x, y, radius) {
    let clear = true;

    let i = -radius;
    while (i <= radius && clear) {
        let j = -radius;
        while (j <= radius && clear) {
            let dist = Math.sqrt(i*i+j*j);
            if (dist <= radius+0.05) {
                clear = clear && isClearPosition(x+i, y+j);
                //setPosition(x+i, y+j, TYPE.SNAKE_SPAWN_POINT_TEST);
            }
            j++;
        }
        i++;
    }

    return clear;
}

/*====================*/
/*====================*/
/*====================*/

function isClearInRadiusOrOut(x, y, radius) {
    let clear = true;

    let i = -radius;
    while (i <= radius && clear) {
        let j = -radius;
        while (j <= radius && clear) {
            let dist = Math.sqrt(i*i+j*j);
            if (dist <= radius+0.05) {
                clear = clear && isClearPositionOrOut(x+i, y+j);
                //setPosition(x+i, y+j, TYPE.SNAKE_SPAWN_POINT_TEST);
            }
            j++;
        }
        i++;
    }

    return clear;
}

/*====================*/
/*====================*/
/*====================*/

function isClearFromBorders(x, y, distance) {
    return x >= distance && x < xSize-distance && y >= distance && y < ySize-distance;
}

/*====================*/
/*====================*/
/*====================*/

function distanceFromBorder(x, y) {
    return ;
}

/*====================*/
/*====================*/
/*====================*/

function directionVectorEndPoint(x, y, direction, size) {
    return {
        "x": x + direction.x*size,
        "y": y + direction.y*size
    };
}

/*====================*/
/*====================*/
/*====================*/

function gameIdle() {
//> Reset game (play area, couters), show starter text (Press space to play, on mobiles: Tap here to start)
    gameState = GAME_STATE.IDLE;
    snakeFreeze = false;
    stopAnimation();
    e_appleCounter.innerHTML = 0;
    e_poisonCounter.innerHTML = 0;
    e_stepCounter.innerHTML = 0;

    generateGameArea(e_gameAreaContainer);

    for (let i = 0; i < 10; i++)
        spawnPoisonedApple();
/*
    for (let i = 0; i < 10; i++)
        spawnApple(2);
    for (let i = 0; i < 10; i++)
        spawnPoison(2);
*/
    spawnSnake();
    drawGameArea();
}

/*====================*/
/*====================*/
/*====================*/

function gamePlay() {
//> Start animation (seInterval / reqAnimFrame)
    if (gameState != GAME_STATE.PLAYING) {
        gameState = GAME_STATE.PLAYING;
        startAnimation();
    }
}

/*====================*/
/*====================*/
/*====================*/

function gamePause() {
    gameState = GAME_STATE.PAUSED;
    stopAnimation();
}

/*====================*/
/*====================*/
/*====================*/

function gameUnpause() {
    if (gameState != GAME_STATE.PLAYING) {
        gameState = GAME_STATE.PLAYING;
        startAnimation();
    }
}

/*====================*/
/*====================*/
/*====================*/

function gameDead() {
    gameState = GAME_STATE.DEAD;
    stopAnimation();
}

/*====================*/
/*====================*/
/*====================*/

function gameWon() {
    gameState = GAME_STATE.WON;
    snakeFreeze = true;
    //stopAnimation();
}

/*====================*/
/*====================*/
/*====================*/
