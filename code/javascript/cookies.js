
let cookies;

function getCookies() {
    /*console.log(`document.cookie:`);
    console.log(document.cookie);*/

    cookies = {};

    if (document.cookie != "") {
        let cook = document.cookie.split(";");

        console.log(`cook:`);
        console.log(cook);

        for (let i = 0; i < cook.length; i++) {
            cook[i] = cook[i].trimStart().split("=");
            cookies[cook[i][0]] = decodeURIComponent(cook[i][1]);
        }
    }

    console.log("cookies:");
    console.log(cookies);
}

/*====================*/
/*====================*/
/*====================*/

function setCookie(name, value, expLengthDays = undefined) {
    let cookieString;

    if (typeof expLengthDays !== "undefined") {
        const d = new Date();
        //console.log(`d.getTime(): ${d.getTime()}`);
        d.setTime(d.getTime() + (expLengthDays*24*60*60*1000));
        //console.log(`d.getTime(): ${d.getTime()}`);
        let expires = `expires=${d.toUTCString()}`;
        cookieString = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    }
    else
        cookieString = `${name}=${encodeURIComponent(value)};path=/`;

    //console.log(`cookieString: ${cookieString}`);
    document.cookie = cookieString;
}
