
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

function eraseSnake() {
    for (let i = 0; i < snake.body.length; i++)
        setPosition(snake.body[i].x, snake.body[i].y, TYPE.CLEAR);
}

/*====================*/
/*====================*/
/*====================*/

function snakeStep() {
    let grow = false;
    let nextPosition = {x: snake.body[0].x+DIRECTION[snake.direction].x,
                        y: snake.body[0].y+DIRECTION[snake.direction].y};

    let newBody = [];

    if (isOutPosition(nextPosition.x, nextPosition.y)) {
        console.log("Game over");
        snakeDie();
    }
    else if (isPosition(nextPosition.x, nextPosition.y, TYPE.SNAKE_BODY)) {
        console.log("Game over - Suicide!");
        snakeSuicide();
    }
    else {
        e_stepCounter.innerHTML = parseInt(e_stepCounter.innerHTML)+1;
        newBody.push(nextPosition);

        if (isPosition(nextPosition.x, nextPosition.y, TYPE.APPLE)) {
            e_appleCounter.innerHTML = parseInt(e_appleCounter.innerHTML)+1;
            grow = true;
        }
        else if (isPosition(nextPosition.x, nextPosition.y, TYPE.POISON)) {
            e_poisonCounter.innerHTML = parseInt(e_poisonCounter.innerHTML)+1;
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


