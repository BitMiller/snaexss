/*
//> This would be less complicated:
const AREA_TYPE = {
    CLEAR: "#000",
    APPLE: "#f00",
    POISON: "#0f0",
    SNAKE_BODY: "#22c",
    SNAKE_HEAD: "#44c",
    SNAKE_SPAWN_POINT_TEST: "#222",
};
*/

//> But this structure allows me to set and check for intervals (e.g. 1000 and above is for testing) :
//> Usage e.g. setPosition(x, y, areaTypes[TYPE.CLEAR]) : 
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

/*====================*/
/*====================*/
/*====================*/

function alterColor(color, byteAmount) {
    let r, g, b, a = undefined;

    if (typeof color === "string") {
        color = color.toLowerCase();
        if (color[0] != "#" || (color[0] == "#" && (color.length != 4 || color.length != 5 || color.length != 7 || color.length != 8))) {
            console.error(`alterColor(): Unsupported string format: ${color}`);
            return;
        }
        switch (color.length) {
            case 4:
                r = HEX_CHARS_TO_NUM[color[1]];
                g = HEX_CHARS_TO_NUM[color[2]];
                b = HEX_CHARS_TO_NUM[color[3]];
            break;
            case 5:
                r = HEX_CHARS_TO_NUM[color[1]];
                g = HEX_CHARS_TO_NUM[color[2]];
                b = HEX_CHARS_TO_NUM[color[3]];
                a = HEX_CHARS_TO_NUM[color[4]];
            break;
            case 7:
                r = HEX_CHARS_TO_NUM[color[1]]*16 + HEX_CHARS_TO_NUM[color[2]];
                g = HEX_CHARS_TO_NUM[color[3]]*16 + HEX_CHARS_TO_NUM[color[4]];
                b = HEX_CHARS_TO_NUM[color[5]]*16 + HEX_CHARS_TO_NUM[color[6]];
            break;
            case 8:
                r = HEX_CHARS_TO_NUM[color[1]]*16 + HEX_CHARS_TO_NUM[color[2]];
                g = HEX_CHARS_TO_NUM[color[3]]*16 + HEX_CHARS_TO_NUM[color[4]];
                b = HEX_CHARS_TO_NUM[color[5]]*16 + HEX_CHARS_TO_NUM[color[6]];
                a = HEX_CHARS_TO_NUM[color[7]]*16 + HEX_CHARS_TO_NUM[color[8]];
            break;
        }
    }
    else
        console.error(`alterColor(): Unsupported color parameter type: ${typeof color}`);

    r = byteToHexString(r + byteAmount);
    g = byteToHexString(g + byteAmount);
    b = byteToHexString(b + byteAmount);

    if (a === undefined)
        return "#"+r+g+b;
    else
        return "#"+r+g+b+byteToHexString(a);
}

/*====================*/
/*====================*/
/*====================*/

function clampToUnsignedByte(value) {
    if (value > 255)
        return 255;
    else if (value < 0)
        return 0;
    else
        return value;
}

/*====================*/
/*====================*/
/*====================*/

function byteToHexString(value) {
    value = Math.floor(value);
    if (value < 0)
        value = 0;
    if (value > 255)
        value = 255;
    return NUM_TO_HEX_CHARS[Math.floor(value / 16)] + NUM_TO_HEX_CHARS[value % 16];
}
