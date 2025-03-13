export class Projectiles {
  constructor(positions, ranges, type) {
    this.ranges = ranges;
    this.projectiles = [];
    const animMap = {
      fish: "swim",
      flame: "burn",
    };
    if (type.includes("fish")) this.tag = "fish";
    if (type.includes("flame")) this.tag = "flame";
    for (const position of positions) {
      this.projectiles.push(
        add([
          sprite(type, { anim: animMap[type] }),
          pos(position),
          area({
            shape: new Rect(vec2(0), 12, 12),
          }),
          anchor("center"),
          scale(4),
          rotate(type.includes("fish") ? 90 : 0),
          state("launch", ["launch", "fall"]),
          offscreen(),
          this.tag,
        ])
      );
    }
  }

  setMovementPattern() {
    for (const [index, projectile] of this.projectiles.entries()) {
      const launch = projectile.onStateEnter("launch", async () => {
        if (this.tag === "fish") projectile.flipX = false;
        if (this.tag === "flame") projectile.flipY = false;

        await tween(
          projectile.pos.y,
          projectile.pos.y - this.ranges[index],
          2,
          (posY) => (projectile.pos.y = posY),
          easings.easeOutSine
        );
        projectile.enterState("fall");
      });

      const fall = projectile.onStateEnter("fall", async () => {
        if (this.tag === "fish") projectile.flipX = true;
        if (this.tag === "flame") projectile.flipY = true;
        await tween(
          projectile.pos.y,
          projectile.pos.y + this.ranges[index],
          2,
          (posY) => (projectile.pos.y = posY),
          easings.easeOutSine
        );
        projectile.enterState("launch");
      });

      onSceneLeave(() => {
        launch.cancel();
        fall.cancel();
      });
    }
  }

  enablePassthrough() {
    for (const projectile of this.projectiles) {
      projectile.onBeforePhysicsResolve((collision) => {
        if (collision.target.is("passthrough") && projectile.isJumping()) {
          collision.preventResolution();
        }
      });
    }
  }
}
