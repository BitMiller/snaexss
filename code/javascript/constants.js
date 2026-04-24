const SNAKE_START_LENGTH = 4;
const SNAKE_CLEARANCE_AHEAD = 4;

const DIRECTION = [
    { x:  0, y: -1 }, //> UP
    { x:  1, y:  0 }, //> RIGHT
    { x:  0, y:  1 }, //> DOWN
    { x: -1, y:  0 }, //> LEFT
];

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;


const KEY_TO_DIRECTION = {
    "ArrowUp": 0,
    "ArrowRight": 1,
    "ArrowDown": 2,
    "ArrowLeft": 3
};

const DIRECTION_TO_KEY = [
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft"
];


const GAME_STATE = {
    IDLE : 0,
    PLAYING : 1,
    PAUSED : 2,
    DEAD : 3
};
