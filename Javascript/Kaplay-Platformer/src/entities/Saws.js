export class Saws {
  constructor(positions, ranges) {
    this.ranges = ranges;
    this.positions = positions;
    this.saws = [];
    for (const position of this.positions) {
      this.saws.push(
        add([
          sprite("saw"),
          pos(position),
          scale(4),
          area(),
          anchor("center"),
          state("rotate-left", ["rotate-left", "rotate-right"]),
          rotate(),
          offscreen(),
          "saw",
        ])
      );
    }
  }

  async moveAndRotate(saw, moveBy) {
    if (!saw.isOffScreen()) play("saw", { volume: 0.3, seek: 10 });

    await Promise.all([
      tween(
        saw.pos.x,
        saw.pos.x + moveBy,
        1,
        (posX) => (saw.pos.x = posX),
        easings.linear
      ),
      tween(
        saw.angle,
        360,
        2,
        (currAngle) => (saw.angle = currAngle),
        easings.linear
      ),
    ]);
  }

  setMovementPattern() {
    for (const [index, saw] of this.saws.entries()) {
      const rotateLeft = saw.onStateEnter("rotate-left", async () => {
        await this.moveAndRotate(saw, -this.ranges[index]);

        saw.angle = 0;
        saw.enterState("rotate-right");
      });

      const rotateRight = saw.onStateEnter("rotate-right", async () => {
        await this.moveAndRotate(saw, this.ranges[index]);

        saw.angle = 0;
        saw.enterState("rotate-left");
      });

      onSceneLeave(() => {
        rotateLeft.cancel();
        rotateRight.cancel();
      });
    }
  }
}
