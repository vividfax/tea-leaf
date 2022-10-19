function moonphase() {
    "use strict";

    var MOONPHASE = {

        get: async function exe() {

            try {
                const result = fetch("https://moonorganizer.com/api/public/moon-phase",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({latitude:51.50722,longitude:-0.1275,date:new Date})});
                return await result;
            } catch(e) {
                console.log(e);
            }
        }
    };

    return {
        get: MOONPHASE.get
    }
}
var moon = moonphase();
