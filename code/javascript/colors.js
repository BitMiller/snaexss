
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

/*====================*/
/*====================*/
/*====================*/
