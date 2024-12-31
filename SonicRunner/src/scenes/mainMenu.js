import k from "../kaplayCtx"
import { makeSonic } from "../entities/sonic";

export default function mainMenu(){

    //set best-score to 0 if there isn't one
    if(!k.getData("best-score")) k.setData("best-score", 0);

    //add Music and let user change music if wanted
    let flag = true;
    let bgMusic = k.play("ehz", { volume: 0.2, loop: true});

    k.onButtonPress("flag", () => {
        if(!flag){
            bgMusic.stop();
            bgMusic = k.play("ehz", { volume: 0.2, loop: true});
            flag = true;
        }
    });

    k.onButtonPress("otherMusic", () => {
        if(flag){
            bgMusic.stop();
            bgMusic = k.play("mainmenu", { volume: 0.3, loop: true});
            flag = false;
        }
    });

    //when player presses jump key, start game
    k.onButtonPress("jump", () => {
        k.go("game", bgMusic, flag);
    });
    
    

    const bgPieceWidth = 1920;
    const platformWidth = 1280;
    const bgPieces = [
        k.add([k.sprite("chemical-bg"), 
            k.pos(0, 0), 
            k.scale(2), 
            k.opacity(0.8)
        ]),
        k.add([
            k.sprite("chemical-bg"), 
            k.pos(bgPieceWidth * 2, 0), 
            k.scale(2), 
            k.opacity(0.8)
        ]),
    ];

    //set platform pieces (same as background pieces for looping, scales 4 because the graphic is 4x the screen width)
    const platforms = [
        k.add([k.sprite("platform"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platform"), k.pos(platformWidth * 4, 450), k.scale(4)]),
    ];

    k.onUpdate(() => {
        if(bgPieces[1].pos.x < 0){
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        //Update platform in similar fashion, moves to the left by 4000
        if(platforms[1].pos.x < 0){
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-4000, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
    });

    //add title and subtitle
    k.add([
        k.text("SONIC RING RUN", {font: "mania", size: 96}),
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Press Space/Click/Touch to Play", {font: "mania", size: 32}),
        k.pos(k.center().x, 350),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Press m/o for different background music", {font: "mania", size: 25}),
        k.pos(k.center().x, 775),
        k.anchor("center"),
    ]);

    //create instance of sonic
    makeSonic(k.vec2(200, 745));
}