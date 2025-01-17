import initKaplay from "./kaplayCtx";
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "./store";

//called from main, sets up characters, background, and all things kaplay
export default function initGame() {
    const k = initKaplay();

    //create diagonal factor based of pythagorean theorem
    const DIAGONAL_FACTOR = 1/Math.sqrt(2);

    k.loadSprite("bg", "./background.png");
    k.loadSprite("characters", "./characters.png", {
        sliceY: 2,
        sliceX: 8,
        anims: {
            "down-idle": 0,
            "up-idle": 1,
            "right-idle": 2,
            "left-idle": 3,
            right: { from: 4, to: 5, loop: true},
            left: { from: 6, to: 7, loop: true},
            down: { from: 8, to: 9, loop: true},
            up: { from: 10, to: 11, loop: true},
            "npc-down": 12,
            "npc-up": 13,
            "npc-right": 14,
            "npc-left": 15,
        }
    });

    k.loadSprite("fox","fox.png", {
        sliceY: 1,
        sliceX: 4,
        anims: {
            "left-idle": 0,
            "right-idle": 1,
            "down-idle": 2,
            "up-idle": 3,
        }
    });

    k.add([
        k.sprite("bg"),
        k.pos(0, -70),
        k.scale(8),
    ]);

    const player = k.add([
        k.sprite("characters", {anim: "down-idle"}),
        k.scale(8),
        k.area(),
        k.body(),
        k.pos(k.center()),
        k.anchor("center"),
        "player",
        {
            speed: 800,
            direction: k.vec2(0, 0),
        },
    ]);

    player.onUpdate(() => {
        player.direction.x = 0;
        player.direction.y = 0;

        //check if arrow keys pressed, store direction if so
        if(k.isKeyDown("left")) player.direction.x = -1;
        if(k.isKeyDown("right")) player.direction.x = 1;
        if(k.isKeyDown("up")) player.direction.y = -1;
        if(k.isKeyDown("down")) player.direction.y = 1;

        //check if anim is played for direction, if not play it
        if (player.direction.eq(k.vec2(-1, 0)) && player.getCurAnim().name !== "left") {
            player.play("left");
        }
        if (player.direction.eq(k.vec2(1, 0)) && player.getCurAnim().name !== "right") {
            player.play("right");
        }
        if (player.direction.eq(k.vec2(0, -1)) && player.getCurAnim().name !== "up") {
            player.play("up");
        }
        if (player.direction.eq(k.vec2(0, 1)) && player.getCurAnim().name !== "down") {
            player.play("down");
        }

        //check if no arrow key pressed and if character is idle, if he isn't make him idle
        if (player.direction.eq(k.vec2(0, 0)) && !player.getCurAnim().name.includes("idle")) {
            player.play(`${player.getCurAnim().name}-idle`);
        }

        //move player diagonally if multiple buttons pressed
        if(player.direction.x && player.direction.y) {
            player.move(player.direction.scale(DIAGONAL_FACTOR * player.speed));
            return;
        }

        //move player based on direction
        player.move(player.direction.scale(player.speed));
    });

    const npc = k.add([
        k.sprite("characters", {anim: "npc-left"}),
        k.area(),
        k.body({ isStatic: true }),
        k.anchor("center"),
        k.scale(8),
        k.pos(1480, 500),
    ]);

    const fox = k.add([
        k.sprite("fox", {anim: "down-idle"}),
        k.area(),
        k.body({ isStatic: true }),
        k.anchor("center"),
        k.scale(6),
        k.pos(1480, 800),
    ]);

    npc.onCollide("player", (player) => {
        if (player.direction.eq(k.vec2(0, -1))){
            store.set(textBoxContentAtom, "Beautiful day, isn't it?")
            npc.play("npc-down");
        }
        if (player.direction.eq(k.vec2(0, 1))){
            store.set(textBoxContentAtom, "Those rocks are heavy!")
            npc.play("npc-up");
        }
        if (player.direction.eq(k.vec2(-1, 0))){
            store.set(textBoxContentAtom, "I'm in love with you.")
            npc.play("npc-right");
        }
        if (player.direction.eq(k.vec2(1, 0))){
            store.set(textBoxContentAtom, "Thoughts on the proletariat and their increasing laziness?")
            npc.play("npc-left");
        }

        store.set(isTextBoxVisibleAtom, true);
    });


    fox.onCollide("player", (player) => {
        if (player.direction.eq(k.vec2(0, -1))){
            fox.play("down-idle");
        }
        if (player.direction.eq(k.vec2(0, 1))){
            fox.play("up-idle");
        }
        if (player.direction.eq(k.vec2(-1, 0))){
            fox.play("right-idle");
        }
        if (player.direction.eq(k.vec2(1, 0))){
            fox.play("left-idle");
        }
    });
}