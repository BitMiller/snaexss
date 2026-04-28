
let snake = {
    body: [],
/*
Snake direction:
0 = Up
1 = Right
2 = Down
3 = Left
*/
    direction: 0,
    spawned: false
};

let snakeFreeze = false;

let poisonCountDown = 0;
let poisonHitCountDown = 0;
const POISON_INTERVAL = 10;
const POISON_HIT_INTERVAL = 5;
const POISON_CLEAR_INTERVAL = 5;
let poisonOverkill = false;

/*====================*/
/*====================*/
/*====================*/

function spawnSnake() {
    console.log("spawnSnake()");
    snake.body = [];

    for (let i = 0; i < SNAKE_START_LENGTH; i++)
        snake.body.push({x: 0, y: 0});

    let pos_OK = false;
    let xStart = -1;
    let yStart = -1;
    let directionStart = -1;
    let tries = 0;
    let maxTries = 20;

    while (!pos_OK && tries < maxTries) {
        xStart = Math.floor(Math.random() * xSize);
        yStart = Math.floor(Math.random() * ySize);
        directionStart = Math.floor(Math.random() * 4);

        let clearAhead = isClearInDirection(xStart, yStart, DIRECTION[directionStart], SNAKE_CLEARANCE_AHEAD);
        let clearBehind = isClearInDirection(xStart, yStart, DIRECTION[(directionStart+2)%4], SNAKE_START_LENGTH-1);

        if (clearAhead && clearBehind)
            pos_OK = true;
        tries++;
    }

    //console.log(`snake.body.length: ${snake.body.length}`);

    if (tries == maxTries)
        console.log(`spawnSnake(): Unbelievable! Couldn't spawn a snake in a max of ${maxTries} tries!`);
    else {
        snake.direction = directionStart;
        for (let i = 0; i < snake.body.length; i++) {
            let x = xStart + DIRECTION[(directionStart+2)%4].x*i;
            let y = yStart + DIRECTION[(directionStart+2)%4].y*i;
            snake.body[i].x = x;
            snake.body[i].y = y;
        }
        drawSnake();
        snake.spawned = true;
    }

}

/*====================*/
/*====================*/
/*====================*/

function drawSnake() {
    for (let i = 0; i < snake.body.length; i++) {
        if (i == 0)
            setPosition(snake.body[i].x, snake.body[i].y, TYPE.SNAKE_HEAD);
        else
            setPosition(snake.body[i].x, snake.body[i].y, TYPE.SNAKE_BODY);
    }
}

/*====================*/
/*====================*/
/*====================*/

function drawDeadSnake() {
    for (let i = 0; i < snake.body.length; i++) {
        if (i == 0)
            setPosition(snake.body[i].x, snake.body[i].y, TYPE.SNAKE_HEAD_DEAD);
        else
            setPosition(snake.body[i].x, snake.body[i].y, TYPE.SNAKE_BODY_DEAD);
    }
}

/*====================*/
/*====================*/
/*====================*/

function drawWinnerSnakeToArea() {
    let maxIdx = snake.body.length-1;
    for (let i = 0; i <= maxIdx; i++)
        gameArea[snake.body[maxIdx-i].x][snake.body[maxIdx-i].y].element.style.background = WIN_COLORS[(i+winAnimationFrame) % WIN_COLORS.length];
}

/*====================*/
/*====================*/
/*====================*/

function eraseSnake() {
    for (let i = 0; i < snake.body.length; i++)
        setPosition(snake.body[i].x, snake.body[i].y, TYPE.CLEAR);
}

/*====================*/
/*====================*/
/*====================*/

function snakeStep() {
    if (snakeFreeze)
        return;

    let grow = false;
    let nextPosition = {x: snake.body[0].x+DIRECTION[snake.direction].x,
                        y: snake.body[0].y+DIRECTION[snake.direction].y};

    let newBody = [];

    if (isOutPosition(nextPosition.x, nextPosition.y)) {
        console.log("Game over");
        healPoison();
        snakeDie();
    }
    else if (isPosition(nextPosition.x, nextPosition.y, TYPE.SNAKE_BODY)) {
        //console.log(`snakeBodyHitPosition(nextPosition): ${snakeBodyHitPosition(nextPosition)}`);
        if (snakeBodyHitPosition(nextPosition) >= snake.body.length - 2)
            console.log("Game over - SuASScide!");
        else
            console.log("Game over - Suicide!");
        healPoison();
        snakeSuicide();
    }
    else {
        checkPoison();
        e_stepCounter.innerHTML = parseInt(e_stepCounter.innerHTML)+1;
        newBody.push(nextPosition);

        if (isPosition(nextPosition.x, nextPosition.y, TYPE.APPLE)) {
            e_appleCounter.innerHTML = parseInt(e_appleCounter.innerHTML)+1;
            grow = true;
            spawnPoisonedApple();
        }
        else if (isPosition(nextPosition.x, nextPosition.y, TYPE.POISON)) {
            e_poisonCounter.innerHTML = parseInt(e_poisonCounter.innerHTML)+1;
            snakeAtePoison();
        }

        if (grow) {
            for (let i = 0; i < snake.body.length; i++) {
                newBody.push(snake.body[i]);
            }
        }
        else {
            setPosition(snake.body[snake.body.length-1].x, snake.body[snake.body.length-1].y, TYPE.CLEAR);
            for (let i = 1; i < snake.body.length; i++) {
                newBody.push(snake.body[i-1]);
            }
        }

        snake.body = newBody;

        if (parseInt(e_appleCounter.innerHTML) >= POINTS_TO_WIN)
            gameWon();
        else
            drawSnake();
    }
}

/*====================*/
/*====================*/
/*====================*/

function snakeDie() {
    gameState = GAME_STATE.DEAD;
    stopAnimation();
    drawDeadSnake();
    drawGameArea();
}

/*====================*/
/*====================*/
/*====================*/

function snakeSuicide() {
    gameState = GAME_STATE.DEAD;
    stopAnimation();
    drawDeadSnake();
    drawGameArea();
}

/*====================*/
/*====================*/
/*====================*/

//> https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript

function snakeBodyHitPosition(chkPos) {

    if (typeof chkPos.x === "undefined" || typeof chkPos.y === "undefined") {
        console.error(`snakeBodyHitPosition(): chkPos: incorrect input type!`);
        return -1;
    }

    let i = 0;
    while (i < snake.body.length && (chkPos.x != snake.body[i].x || chkPos.y != snake.body[i].y))
        i++;

    if (i < snake.body.length)
        return i;
    return -1;
}

/*====================*/
/*====================*/
/*====================*/

function snakeAtePoison() {
    if (poisonCountDown > 0)
        poisonOverkill = true;
    poisonCountDown += POISON_INTERVAL;
    poisonHitCountDown = POISON_HIT_INTERVAL;
    e_blackoutArea.classList.add("blurred");
}

/*====================*/
/*====================*/
/*====================*/

function checkPoison() {
    console.log(`poisonCountDown: ${poisonCountDown}`);
    if (poisonCountDown == 0) {
        if (poisonOverkill)
            poisonOverkill = false;
        healPoison();
        return;
    }

    let color = {
        x: 0,
        y: 0,
        z: 0,
        a: 0
    };



    poisonCountDown--;
    if (poisonHitCountDown > 0)
        poisonHitCountDown--;
}

/*====================*/
/*====================*/
/*====================*/

function healPoison() {
    e_blackoutArea.classList.remove("blurred");
    poisonCountDown = 0;
    poisonHitCountDown = 0;
    poisonOverkill = false;
}