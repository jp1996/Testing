import kaplay from "kaplay";

//create kaplay instance and store in k. set res, letterbox(fit to screen), black background, don't make the kaplay instance global, and touchToMouse for mobile to work
const k = kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,
    background: [0, 0, 0],
    global: false,
    touchToMouse: true,
    buttons: {
        jump: {
            keyboard: ["space","up","w"],
            mouse: "left",
        },
        defaultMusic: {
            keyboard: ["m"],
        },
        otherMusic: {
            keyboard: ["o"],
        },
    },
    debugKey: "d",
    debug: true,
});

export default k;