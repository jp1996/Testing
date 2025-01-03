import kaplay from "kaplay";

export default function initKaplay() {
    return kaplay({
        width: 1920,
        height: 1080,
        letterbox: true,
        global: false,
        debug: true, // TODO: put back to false in PROD
        debugKey: "j",
        canvas: document.getElementById("game"),
        pixelDensity: devicePixelRatio,
    });
}