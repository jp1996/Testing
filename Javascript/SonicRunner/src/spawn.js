import k from "./kaplayCtx";

export function makeObj(speed, obj) {
    obj.onUpdate(() => {
        obj.move(-speed, 0);
    });

    //delete motobug if offscreen left
    obj.onExitScreen(() => {
        if(obj.pos.x < 0){
            k.destroy(obj);
        }
    });
}