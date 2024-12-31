import k from "../kaplayCtx"
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeObj } from "../spawn";

export default function game(bgMusic, flag) {
    k.setGravity(3100);
    const citySfx = k.play("city", {volume: 0.2, loop: true});

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

    //set music
    k.onButtonPress("defaultMusic", () => {
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

    //set platform pieces (same as background pieces for looping, scales 4 because the graphic is 4x the screen width)
    const platforms = [
        k.add([k.sprite("platform"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platform"), k.pos(platformWidth * 4, 450), k.scale(4)]),
    ];

    //set speed for platform, make it slowly increase
    let speed = 300;
    k.loop(1, () => {
        speed +=  50;
    });

    //add rect as platform for collision
    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({ isStatic: true}),
    ]);

    let score = 0;
    let scoreMultiplier = 0;

    const scoreText = k.add([
        k.text("SCORE : " + score, { font: "mania", size: 72}),
        k.pos(20, 20),
    ]);


    //spawn sonic, and call both functions to check when jump is pressed and when he's on the ground.
    const sonic = makeSonic(k.vec2(200, 745));
    sonic.setControls();
    sonic.setEvents();
    sonic.onCollide("enemy", (enemy) => {
        if(!sonic.isGrounded()){
            k.play("destroy", {volume: .1});
            k.play("hyper-ring", {volume: .1});
            k.destroy(enemy);
            sonic.jump();
            sonic.play("jump");
            scoreMultiplier++;
            score += 10 * scoreMultiplier;
            scoreText.text = `SCORE : ${score}`;
            if(scoreMultiplier === 1) sonic.ringCollectUI.text = "+10";
            if(scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
            k.wait(1, () => (sonic.ringCollectUI.text = ""));
        } else {
            k.play("hurt", {volume: 0.3});
            k.setData("current-score", score)
            k.go("gameover", citySfx, bgMusic, flag);
        }
    });
    sonic.onCollide("ring", (ring) => {
        k.play("hyper-ring", {volume: .1});
        k.destroy(ring);
        score++;
        scoreText.text = `SCORE : ${score}`;
        sonic.ringCollectUI.text = "+1";
        k.wait(1, () => (sonic.ringCollectUI.text = ""));
    });


    //spawn motobug, recursive to spawn every .5 to 2.5 seconds
    const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773));
        if(speed < 3000){
            makeObj(speed+300, motobug);
        } else {
            makeObj(speed, motobug);
        }
        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnMotoBug);
    };
    spawnMotoBug();

    const spawnRing = () => {
        const ring = makeRing(k.vec2(1950, 745));
        makeObj(speed, ring);
        const waitTime = k.rand(0.5, 3);
        k.wait(waitTime, spawnRing);
    }
    spawnRing();

    k.onUpdate(() => {
        if(sonic.isGrounded()){
            scoreMultiplier = 0;
        }

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

        platforms[0].move(-speed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);

        
        //move backgroud down when sonic jumps based off his y pos
        bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y /  10 - 50);
        bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y /  10 - 50);
    });
}