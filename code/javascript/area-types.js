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
0: "#000", //> CLEAR
1: "#f00", //> APPLE
2: "#0f0", //> POISON
3: "#44c", //> SNAKE_HEAD
4: "#22c", //> SNAKE_BODY
5: "#a4a", //> SNAKE_HEAD_DEAD
6: "#727", //> SNAKE_BODY_DEAD
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

