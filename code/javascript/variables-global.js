/*====================*/
/*====================*/
/*====================*/

/*
    0#Game
    0#Game area
    0#Directions
    0#Key handling
    0#Colors
    0#Cookies
    0#Snake
    0#Animation
*/

/*====================*/
/*====================*/
/*====================*/

//> 1#Game:

const POINTS_TO_WIN = 20;

const GAME_STATE = {
    IDLE : 0,
    PLAYING : 1,
    PAUSED : 2,
    DEAD : 3,
    WON : 4
};

/*====================*/
/*====================*/
/*====================*/

//> 1#Game area:

let gameArea = [];
let gameAreaOverlay1 = [];
let xSize = 20;
let ySize = 20;
let gridSize = 15

/*====================*/
/*====================*/
/*====================*/

//> 1#Directions:

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

/*====================*/
/*====================*/
/*====================*/

//> 1#Key handling:

const pressedKeys = new Set();

const controlBuffer = [];

const directionKeys = [
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft"
];

let wasPlayingBeforeMenu = false;

let gameState = GAME_STATE.IDLE;


const KEY_CAPTURE_MODE = {
    PLAYING : 0,
    FLOATER : 1,
    DISABLED : 2
};

class KeyCaptureMode {
    #mode;
    constructor() {
        this.#mode = KEY_CAPTURE_MODE.PLAYING;
    }

    get mode() { return this.#mode; }

    set mode(m) {
        this.#mode = m;
        pressedKeys.clear();
    }
}

let keyCapture = new KeyCaptureMode();

const combos = [
    ["F11"], //> Full Screen
    ["F12"], //> Dev Tools
    ["ControlLeft", "ShiftLeft", "KeyR"], //> Full Reload Page on Win
    ["MetaLeft", "ShiftLeft", "KeyR"], //> Full Reload Page on Mac
];

/*====================*/
/*====================*/
/*====================*/

//> 1#Colors:

let areaTypes = {
0: "#0003", //> CLEAR
1: "#f00", //> APPLE
/*
2: "#0f0", //> POISON
3: "#44c", //> SNAKE_HEAD
4: "#22c", //> SNAKE_BODY
*/

//2: "#0ff", //> POISON
2: "rgb(27, 255, 225)", //> POISON

3: "rgb(26, 180, 12)", //> SNAKE_HEAD
4: "rgb(108, 243, 19)", //> SNAKE_BODY

5: "rgb(128, 26, 128)", //> SNAKE_HEAD_DEAD
6: "rgb(206, 7, 206)", //> SNAKE_BODY_DEAD
/*
5: "#a4a", //> SNAKE_HEAD_DEAD
6: "#727", //> SNAKE_BODY_DEAD
*/
1000: "#222", //> SNAKE_SPAWN_POINT_TEST
9999: "outArea", //> OUT_AREA
};

const TYPE = {
    CLEAR: 0,
    APPLE: 1,
    POISON: 2,
    SNAKE_HEAD: 3,
    SNAKE_BODY: 4,
    SNAKE_HEAD_DEAD: 5,
    SNAKE_BODY_DEAD: 6,
    SNAKE_SPAWN_POINT_TEST: 1000,
    OUT_AREA: 9999, //> This can be returned when outside of the map or in holes on the map.
};

const HEX_CHARS_TO_NUM = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 10,
    "b": 11,
    "c": 12,
    "d": 13,
    "e": 14,
    "f": 15
};

const NUM_TO_HEX_CHARS = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
];

const WIN_COLORS = [
    "#f00",
    "#f80",
    "#ff0",
    "#8f0",
    "#0f0",
    "#0f8",
    "#0ff",
    "#08f",
    "#00f",
    "#80f",
    "#f0f",
    "#f08",
];

/*====================*/
/*====================*/
/*====================*/

//> 1#Cookies:

let cookies;

/*====================*/
/*====================*/
/*====================*/

//> 1#Snake:

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

const SNAKE_START_LENGTH = 2;
const SNAKE_CLEARANCE_AHEAD = 4;

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

//> 1#Animation:

let frame = 0;
let winAnimationFrame = 0;

let animationHandle = undefined;

let frameInterval = 15;
let stepInterval = 10;
let winInterval = 3;

/*====================*/
/*====================*/
/*====================*/
