import * as Config from "./../constants/config.js";

export function httpGetAsync(endpoint, resolve, reject, pending = null) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status === 200) {
            resolve(xmlHttp);
        }
        if (xmlHttp.readyState == 2 || xmlHttp.readyState == 3) {
            if (pending !== null) {
                pending();
            }
        }
    };
    xmlHttp.open("GET", `${Config.API_URL}/${endpoint}`, true);
    xmlHttp.send(null);
}
