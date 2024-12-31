import k from "../kaplayCtx"

export function makeSonic(pos) {
    const sonic = k.add([
        k.sprite("sonic", {anim: "run"}),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),

        //body needed to use jump function, set jumpforce stat
        k.body({jumpForce: 1700}),
        {
            ringCollectUI: null,

            //reads when jump is pressed to make sonic jump and play audio
            setControls() {
                k.onButtonPress("jump", () => {
                    if(this.isGrounded()){
                        this.play("jump");
                        this.jump();
                        k.play("jump", {volume: 0.1});
                    }
                })
            },

            //checks when sonic is on the ground to play the run animation
            setEvents(){
                this.onGround(() => {
                    this.play("run");
                });
            }
        }
    ]);

    sonic.ringCollectUI = sonic.add([
        k.text("", { font: "mania", size: 24}),
        k.color(255, 255, 0),
        k.anchor("center"),
        k.pos(30, -10),
    ]);

    return sonic;
}