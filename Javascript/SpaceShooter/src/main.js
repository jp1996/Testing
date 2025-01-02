import kaplay from "kaplay";
import { loadAssets } from "./loadAssets";
import { makeMenu } from "./makeMenu";
import { makeGame } from "./makeGame";
import { makeGameOver } from "./makeGameOver";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
    letterbox: true,
    width: 1280,
    height: 720,
    crisp: true,
    global: false,
});

k.setBackground(k.Color.fromHex("#071821"));

loadAssets(k);

makeMenu(k);
makeGame(k);
makeGameOver(k);

k.go("menu");